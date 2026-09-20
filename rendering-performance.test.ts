import type {} from "bun";
import { describe, expect, test, spyOn } from "bun:test";
import { readFile } from "node:fs/promises";
import JSZip from "jszip";
import { computeAllWorldTransforms, sampleAttachmentOpacityAtFrame, sampleBonesAtFrame } from "./src/lib/sbn/sampling";
import { createAnimationFrameGate } from "./src/lib/runtime/graphicsSettings";
import { CanvasSbnRenderer } from "./src/lib/rendering/canvasSbnRenderer";
import type { SbnProject, WorldBone } from "./src/types/sbn";

const makeBone = (id: number, parentId: number | null): WorldBone => ({
  id, parentId, name: String(id), x: 1, y: 2, length: 10,
  rotation: 0, scaleX: 1, scaleY: 1, _wx: 0, _wy: 0, _wrot: 0,
});

const referenceTransforms = (bones: WorldBone[]) => {
  const byId = new Map(bones.map((bone) => [bone.id, bone]));
  for (const bone of bones) {
    if (bone.parentId !== null) continue;
    bone._wx = bone.x;
    bone._wy = bone.y;
    bone._wrot = bone.rotation;
  }
  for (let pass = 0; pass < bones.length; pass += 1) {
    for (const bone of bones) {
      const parent = bone.parentId === null ? undefined : byId.get(bone.parentId);
      if (!parent) continue;
      const cos = Math.cos(parent._wrot * Math.PI / 180);
      const sin = Math.sin(parent._wrot * Math.PI / 180);
      const x = bone.x * parent.scaleX;
      const y = bone.y * parent.scaleY;
      bone._wx = parent._wx + x * cos - y * sin;
      bone._wy = parent._wy + x * sin + y * cos;
      bone._wrot = parent._wrot + bone.rotation;
    }
  }
};

describe("SBN transforms", () => {
  test("resolves an unordered hierarchy with linear transform work", () => {
    const bones = Array.from({ length: 80 }, (_, id) => makeBone(id, id ? id - 1 : null)).reverse();
    const cos = spyOn(Math, "cos");
    let calls = 0;
    try {
      computeAllWorldTransforms(bones);
      calls = cos.mock.calls.length;
    } finally {
      cos.mockRestore();
    }
    expect(bones[0]._wx).toBe(80);
    expect(bones[0]._wy).toBe(160);
    expect(calls).toBeLessThanOrEqual(79);
  });

  test("preserves rotation, local scale, multiple roots and orphan behavior", () => {
    const bones = [makeBone(3, 2), makeBone(2, 1), makeBone(1, null), makeBone(4, null), makeBone(5, 99)];
    bones[1].rotation = 24;
    bones[1].scaleX = -2;
    bones[2].rotation = 70;
    bones[2].scaleY = 3;
    const expected = structuredClone(bones);
    referenceTransforms(expected);
    computeAllWorldTransforms(bones);
    expect(bones).toEqual(expected);
  });

  test("does not hang on a malformed cycle", () => {
    const bones = [makeBone(1, 2), makeBone(2, 1)];
    computeAllWorldTransforms(bones);
    expect(bones.every((bone) => Number.isFinite(bone._wx))).toBe(true);
  });

  for (const asset of ["maya/maya-sad.sbn", "mayas-father/maya's-father-normal.sbn"]) {
    test(`matches existing transforms for ${asset}`, async () => {
      const zip = await JSZip.loadAsync(await readFile(new URL(`./src/character/${asset}`, import.meta.url)));
      const project = JSON.parse(await zip.file("project.json")!.async("string")) as SbnProject;
      for (const frame of [0, 0.5, project.duration / 2, project.duration - 1]) {
        const bones = sampleBonesAtFrame(project, frame);
        const expected = structuredClone(bones);
        referenceTransforms(expected);
        expect(bones).toEqual(expected);
      }
      console.info(`${asset}: ${project.bones.length} bones, ${project.attachments.length} attachments, ${project.attachments.reduce((count, attachment) => count + (attachment.meshTriangles ?? attachment.mesh?.triangles ?? []).length, 0)} mesh triangles`);
    });
  }
});

const renderAttachmentAlphas = (project: SbnProject, frame: number) => {
  const alphas: number[] = [];
  const stack: number[] = [];
  const ctx = {
    globalAlpha: 1,
    save() { stack.push(this.globalAlpha); },
    restore() { this.globalAlpha = stack.pop() ?? 1; },
    drawImage() { alphas.push(this.globalAlpha); },
    clearRect() {}, translate() {}, rotate() {}, scale() {},
    beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, clip() {}, transform() {},
  };
  const renderer = new CanvasSbnRenderer();
  renderer.attach({ getContext: () => ctx } as unknown as HTMLCanvasElement);
  const image = { naturalWidth: 1159, naturalHeight: 589 } as HTMLImageElement;
  const getImage = spyOn(renderer as unknown as { getImage: (src: string) => HTMLImageElement }, "getImage")
    .mockReturnValue(image);
  try {
    renderer.render({
      project, frame, scale: 1,
      camera: { minX: -1000, minY: -500, maxX: 1000, maxY: 500, centerX: 0, centerY: 0, zoom: 1 },
      viewportWidth: 2000, viewportHeight: 1000,
    });
  } finally {
    getImage.mockRestore();
  }
  expect(ctx.globalAlpha).toBe(1);
  return alphas;
};

for (const type of ["mesh", "image"]) {
  test(`leaf ${type} fades out before its position resets at the loop boundary`, async () => {
    const zip = await JSZip.loadAsync(await readFile(new URL("./src/assets/leaf.sbn", import.meta.url)));
    const project = JSON.parse(await zip.file("project.json")!.async("string")) as SbnProject;
    project.backgroundImage = null;
    project.attachments = project.attachments.filter((attachment) => attachment.name === "BG3").map((attachment) => ({
      ...attachment, type, imageData: "leaf-test-image",
      meshVertices: attachment.meshVertices ?? attachment.mesh?.vertices,
      meshTriangles: attachment.meshTriangles ?? attachment.mesh?.triangles,
    }));
    for (const [frame, opacity] of [[0, 0], [25, 0.5], [50, 1], [75, 0.5], [99, 0.02], [100, 0], [0, 0]]) {
      const alphas = renderAttachmentAlphas(project, frame);
      if (opacity === 0) {
        expect(alphas).toHaveLength(0);
      } else {
        expect(alphas.length).toBeGreaterThan(0);
        for (const alpha of alphas) expect(alpha).toBeCloseTo(opacity, 6);
      }
    }
  });
}

test("attachment opacity respects easing, endpoints, static values and empty tracks", () => {
  const project: SbnProject = {
    bones: [makeBone(1, null)], skins: [], duration: 40,
    slots: [{ id: 1, name: "leaf", boneId: 1, attachmentName: "leaf", drawOrder: 0 }],
    attachments: [{ name: "leaf", type: "image", slotId: 1, width: 10, height: 10,
      x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, opacity: 0.3, imageData: "leaf-test-image" }],
  };
  const attachment = project.attachments[0];
  expect(sampleAttachmentOpacityAtFrame(project, attachment, 0)).toBe(0.3);
  expect(renderAttachmentAlphas(project, 0)).toEqual([0.3]);
  project.attachmentOpacityKeyframes = { "1:leaf": {} };
  expect(sampleAttachmentOpacityAtFrame(project, attachment, 5)).toBe(0.3);
  project.attachmentOpacityKeyframes["1:leaf"] = {
    "10": { opacity: 0, easing: "easeIn" },
    "20": { opacity: 1, easing: "easeOut" },
    "30": { opacity: 0 },
  };
  for (const [frame, opacity] of [[0, 0], [10, 0], [15, 0.25], [20, 1], [25, 0.25], [30, 0], [40, 0]]) {
    expect(sampleAttachmentOpacityAtFrame(project, attachment, frame)).toBeCloseTo(opacity, 6);
  }
  expect(attachment.opacity).toBe(0.3);
  project.attachmentOpacityKeyframes["1:leaf"] = { "10": { opacity: 0.7 } };
  expect(sampleAttachmentOpacityAtFrame(project, attachment, 0)).toBe(0.7);
  expect(sampleAttachmentOpacityAtFrame(project, attachment, 40)).toBe(0.7);
  delete project.attachmentOpacityKeyframes;
  attachment.opacity = 2;
  expect(sampleAttachmentOpacityAtFrame(project, attachment, 0)).toBe(1);
  attachment.opacity = -1;
  expect(sampleAttachmentOpacityAtFrame(project, attachment, 0)).toBe(0);
  delete attachment.opacity;
  expect(sampleAttachmentOpacityAtFrame(project, attachment, 0)).toBe(1);
});

describe("animation render cadence", () => {
  const createGate = createAnimationFrameGate;

  for (const frameRate of [24, 40, 60]) {
    test(`limits a 120 Hz display to ${frameRate} renders per second`, () => {
      const shouldRender = createGate();
      const frames = Array.from({ length: 120 }, (_, i) => i * 1000 / 120);
      expect(frames.filter((time) => shouldRender(time, frameRate))).toHaveLength(frameRate);
    });
  }

  test("applies a changed frame rate immediately and skips missed deadlines", () => {
    const shouldRender = createGate();
    expect(shouldRender(0, 24)).toBe(true);
    expect(shouldRender(8, 24)).toBe(false);
    expect(shouldRender(9, 60)).toBe(true);
    expect(shouldRender(1000, 60)).toBe(true);
    expect(shouldRender(1001, 60)).toBe(false);
  });

  test("preserves animation speed when renders are skipped", () => {
    for (const rate of [24, 40, 60]) {
      const shouldRender = createGate();
      let frame = 0;
      let lastTime = 0;
      for (let tick = 0; tick <= 240; tick += 1) {
        const time = tick * 1000 / 120;
        if (!shouldRender(time, rate)) continue;
        frame += 24 * (time - lastTime) / 1000;
        lastTime = time;
      }
      expect(frame).toBeCloseTo(48, 6);
    }
  });
});

test("padded images are reused across renderers by image identity and padding", () => {
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const canvases: Array<{ width: number; height: number; getContext: () => object }> = [];
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      createElement: () => {
        const canvas = { width: 0, height: 0, getContext: () => ({ drawImage: () => {} }) };
        canvases.push(canvas);
        return canvas;
      },
    },
  });
  try {
    const first = new CanvasSbnRenderer() as unknown as {
      getPaddedImage: (image: HTMLImageElement, padding: number) => HTMLCanvasElement;
    };
    const second = new CanvasSbnRenderer() as unknown as typeof first;
    const image = { naturalWidth: 40, naturalHeight: 80 } as HTMLImageElement;
    const padded = first.getPaddedImage(image, 2);
    for (let frame = 0; frame < 120; frame += 1) {
      expect(second.getPaddedImage(image, 2)).toBe(padded);
    }
    expect(canvases).toHaveLength(1);
    expect(padded.width).toBe(44);
    expect(padded.height).toBe(84);
    expect(first.getPaddedImage(image, 3)).not.toBe(padded);
    expect(first.getPaddedImage({ ...image } as HTMLImageElement, 2)).not.toBe(padded);
    expect(canvases).toHaveLength(3);
  } finally {
    if (originalDocument) Object.defineProperty(globalThis, "document", originalDocument);
    else Reflect.deleteProperty(globalThis, "document");
  }
});
