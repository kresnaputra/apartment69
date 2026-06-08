import type { SceneBounds, SbnAttachment, SbnBone, SbnKeyframe, SbnProject, SbnSlot, WorldBone } from "@/types/sbn";

const DEFAULT_CAMERA: SceneBounds = {
  minX: -100,
  minY: -100,
  maxX: 100,
  maxY: 100,
  centerX: 0,
  centerY: 0,
  zoom: 1,
};

type CachedSceneExtents = Omit<SceneBounds, "zoom">;

const sceneExtentsCache = new WeakMap<SbnProject, CachedSceneExtents>();
const cameraBoundsCache = new WeakMap<SbnProject, Map<string, SceneBounds>>();
const bonesCache = new WeakMap<SbnProject, Map<number, WorldBone[]>>();

const cloneBones = (bones: SbnBone[]): WorldBone[] =>
  bones.map((bone) => ({
    ...bone,
    _wx: bone._wx ?? bone.x,
    _wy: bone._wy ?? bone.y,
    _wrot: bone._wrot ?? bone.rotation,
  }));

const normalizeKeyframeData = (data?: SbnKeyframe) => ({
  x: data?.x ?? 0,
  y: data?.y ?? 0,
  rotation: data?.rotation ?? 0,
  scaleX: data?.scaleX ?? 1,
  scaleY: data?.scaleY ?? 1,
  easing: data?.easing ?? "linear",
});

export const applyEasing = (easing: string, t: number) => {
  if (easing === "easeIn") return t * t;
  if (easing === "easeOut") return 1 - (1 - t) * (1 - t);
  if (easing === "easeInOut") {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  return t;
};

export const computeAllWorldTransforms = (bones: WorldBone[]) => {
  const boneById = new Map(bones.map((bone) => [bone.id, bone]));

  for (const bone of bones) {
    if (bone.parentId === null) {
      bone._wx = bone.x;
      bone._wy = bone.y;
      bone._wrot = bone.rotation;
    }
  }

  for (let pass = 0; pass < bones.length; pass += 1) {
    for (const bone of bones) {
      if (bone.parentId === null) continue;
      const parent = boneById.get(bone.parentId);
      if (!parent) continue;

      const cos = Math.cos((parent._wrot * Math.PI) / 180);
      const sin = Math.sin((parent._wrot * Math.PI) / 180);
      const localX = bone.x * parent.scaleX;
      const localY = bone.y * parent.scaleY;

      bone._wx = parent._wx + localX * cos - localY * sin;
      bone._wy = parent._wy + localX * sin + localY * cos;
      bone._wrot = parent._wrot + bone.rotation;
    }
  }
};

export const sampleBonesAtFrame = (project: SbnProject, frame: number) => {
  let projectCache = bonesCache.get(project);
  if (!projectCache) {
    projectCache = new Map();
    bonesCache.set(project, projectCache);
  }

  const cached = projectCache.get(frame);
  if (cached) {
    // Deep clone to avoid returning mutated references
    return cached.map(bone => ({ ...bone }));
  }

  const bones = cloneBones(project.bones).map((bone) => {
    const setup = project.setupPose?.[String(bone.id)];
    return setup ? { ...bone, ...setup } : bone;
  });

  for (const bone of bones) {
    const boneKeyframes = project.keyframes?.[String(bone.id)];
    if (!boneKeyframes) continue;

    const frames = Object.keys(boneKeyframes)
      .map(Number)
      .sort((a, b) => a - b);

    if (frames.length === 0) continue;

    let previousFrame: number | null = null;
    let nextFrame: number | null = null;

    for (const keyframe of frames) {
      if (keyframe <= frame) previousFrame = keyframe;
      if (keyframe >= frame && nextFrame === null) nextFrame = keyframe;
    }

    const applyFrame = (frameIndex: number) => {
      const data = normalizeKeyframeData(boneKeyframes[String(frameIndex)]);
      bone.x = data.x;
      bone.y = data.y;
      bone.rotation = data.rotation;
      bone.scaleX = data.scaleX;
      bone.scaleY = data.scaleY;
    };

    if (previousFrame === null && nextFrame !== null) {
      applyFrame(nextFrame);
      continue;
    }

    if (previousFrame !== null && nextFrame === null) {
      applyFrame(previousFrame);
      continue;
    }

    if (previousFrame === null || nextFrame === null) continue;

    const from = normalizeKeyframeData(boneKeyframes[String(previousFrame)]);
    const to = normalizeKeyframeData(boneKeyframes[String(nextFrame)]);
    const t = previousFrame === nextFrame ? 1 : (frame - previousFrame) / (nextFrame - previousFrame);
    const easedT = applyEasing(String(from.easing), t);
    const lerp = (start: number, end: number) => start + (end - start) * easedT;

    bone.x = lerp(from.x, to.x);
    bone.y = lerp(from.y, to.y);
    bone.rotation = lerp(from.rotation, to.rotation);
    bone.scaleX = lerp(from.scaleX, to.scaleX);
    bone.scaleY = lerp(from.scaleY, to.scaleY);
  }

  computeAllWorldTransforms(bones);
  projectCache.set(frame, bones);
  
  // Limit cache size to prevent memory leaks
  if (projectCache.size > 100) {
    const firstKey = projectCache.keys().next().value;
    if (firstKey !== undefined) {
      projectCache.delete(firstKey);
    }
  }
  
  return bones;
};

export const sampleMeshDeformAtFrame = (
  project: SbnProject,
  frame: number,
): Record<string, Array<{ x: number; y: number }>> => {
  const mdk = project.meshDeformKeyframes;
  if (!mdk) return {};

  const result: Record<string, Array<{ x: number; y: number }>> = {};

  for (const [key, frameData] of Object.entries(mdk)) {
    const frames = Object.keys(frameData).map(Number).sort((a, b) => a - b);
    if (frames.length === 0) continue;

    let prevFrame: number | null = null;
    let nextFrame: number | null = null;
    for (const kf of frames) {
      if (kf <= frame) prevFrame = kf;
      if (kf >= frame && nextFrame === null) nextFrame = kf;
    }

    if (prevFrame === null && nextFrame !== null) {
      result[key] = frameData[String(nextFrame)].vertices;
      continue;
    }
    if (prevFrame !== null && nextFrame === null) {
      result[key] = frameData[String(prevFrame)].vertices;
      continue;
    }
    if (prevFrame === null || nextFrame === null) continue;

    const from = frameData[String(prevFrame)].vertices;
    const to = frameData[String(nextFrame)].vertices;
    const t = prevFrame === nextFrame ? 1 : (frame - prevFrame) / (nextFrame - prevFrame);

    result[key] = from.map((v, i) => ({
      x: v.x + (to[i].x - v.x) * t,
      y: v.y + (to[i].y - v.y) * t,
    }));
  }

  return result;
};

export const resolveSceneDrawables = (
  project: SbnProject,
  bones: WorldBone[],
): Array<{ slot: SbnSlot; attachment: SbnAttachment; bone: WorldBone }> => {
  // Note: Removed caching here as bones are mutable and change every frame
  // The performance gain from caching is negligible compared to bone calculations
  return bones.flatMap((bone) => {
    const boneSlots = project.slots
      .filter((slot) => slot.boneId === bone.id)
      .sort((left, right) => left.drawOrder - right.drawOrder);

    return boneSlots.flatMap((slot) => {
      if (!slot.attachmentName) return [];

      const attachment = project.attachments.find(
        (item) => item.slotId === slot.id && item.name === slot.attachmentName,
      );
      if (!attachment) return [];

      return [{ slot, attachment, bone }];
    });
  });
};

export const getAttachmentBounds = (attachment: SbnAttachment, bone: WorldBone) => {
  const rotation = ((bone._wrot + attachment.rotation) * Math.PI) / 180;
  const totalScaleX = attachment.scaleX * bone.scaleX;
  const totalScaleY = attachment.scaleY * bone.scaleY;
  const cropBounds = attachment.imageIsCropped ? attachment.opaqueBounds : undefined;
  const pixelScaleX = Math.abs(totalScaleX) * 0.5;
  const pixelScaleY = Math.abs(totalScaleY) * 0.5;
  const width = (cropBounds?.width ?? attachment.width) * pixelScaleX;
  const height = (cropBounds?.height ?? attachment.height) * pixelScaleY;
  const offsetX =
    attachment.x +
    ((cropBounds?.x ?? 0) + (cropBounds?.width ?? attachment.width) / 2 - attachment.width / 2) * pixelScaleX;
  const offsetY =
    attachment.y +
    ((cropBounds?.y ?? 0) + (cropBounds?.height ?? attachment.height) / 2 - attachment.height / 2) * pixelScaleY;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  const centerX = bone._wx + offsetX * cos - offsetY * sin;
  const centerY = bone._wy + offsetX * sin + offsetY * cos;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const corners = [
    { x: -halfWidth, y: -halfHeight },
    { x: halfWidth, y: -halfHeight },
    { x: halfWidth, y: halfHeight },
    { x: -halfWidth, y: halfHeight },
  ].map((corner) => ({
    x: centerX + corner.x * cos - corner.y * sin,
    y: centerY + corner.x * sin + corner.y * cos,
  }));

  return {
    minX: Math.min(...corners.map((corner) => corner.x)),
    maxX: Math.max(...corners.map((corner) => corner.x)),
    minY: Math.min(...corners.map((corner) => corner.y)),
    maxY: Math.max(...corners.map((corner) => corner.y)),
  };
};

export const fitCameraToScene = (
  project: SbnProject | null,
  viewportWidth: number,
  viewportHeight: number,
): SceneBounds => {
  if (!project || viewportWidth <= 0 || viewportHeight <= 0) {
    return DEFAULT_CAMERA;
  }

  // Check camera bounds cache first
  let projectCameraCache = cameraBoundsCache.get(project);
  if (!projectCameraCache) {
    projectCameraCache = new Map();
    cameraBoundsCache.set(project, projectCameraCache);
  }

  const cameraKey = `${Math.round(viewportWidth / 10)}_${Math.round(viewportHeight / 10)}`;
  const cachedCamera = projectCameraCache.get(cameraKey);
  if (cachedCamera) {
    return cachedCamera;
  }

  const cachedExtents = sceneExtentsCache.get(project);
  let extents = cachedExtents;

  if (!extents) {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    const sampledFrames = new Set([0, Math.max(0, project.duration - 1)]);
    const step = Math.max(1, Math.floor(project.duration / 12));

    for (let frame = 0; frame < project.duration; frame += step) {
      sampledFrames.add(frame);
    }

    for (const frame of sampledFrames) {
      const bones = sampleBonesAtFrame(project, frame);
      const drawables = resolveSceneDrawables(project, bones);

      for (const { attachment, bone } of drawables) {
        const bounds = getAttachmentBounds(attachment, bone);
        minX = Math.min(minX, bounds.minX);
        minY = Math.min(minY, bounds.minY);
        maxX = Math.max(maxX, bounds.maxX);
        maxY = Math.max(maxY, bounds.maxY);
      }
    }

    if (!Number.isFinite(minX) || maxX <= minX || maxY <= minY) {
      return DEFAULT_CAMERA;
    }

    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);

    extents = {
      minX,
      minY,
      maxX,
      maxY,
      centerX: minX + width / 2,
      centerY: minY + height / 2,
    };
    sceneExtentsCache.set(project, extents);
  }

  const width = Math.max(1, extents.maxX - extents.minX);
  const height = Math.max(1, extents.maxY - extents.minY);

  const camera = {
    ...extents,
    zoom: Math.min((viewportWidth * 0.78) / width, (viewportHeight * 0.78) / height),
  };

  projectCameraCache.set(cameraKey, camera);

  // Limit cache size
  if (projectCameraCache.size > 20) {
    const firstKey = projectCameraCache.keys().next().value;
    if (firstKey !== undefined) {
      projectCameraCache.delete(firstKey);
    }
  }

  return camera;
};
