import type {
  LoadedSheetSource,
  LoadedSpritesheetBundle,
  SpritesheetFrameData,
  SpritesheetJson,
  SpritesheetManifest,
} from "@/types/spritesheet";

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Gagal memuat spritesheet image: ${src}`));
    img.src = src;
  });

const isSpritesheetJson = (value: SpritesheetManifest | SpritesheetJson): value is SpritesheetJson =>
  "frames" in value;

const getFrameIndex = (frameName: string) => {
  const match = frameName.match(/(\d+)$/);
  return match ? Number(match[1]) : 0;
};

const getTrimBounds = (frames: Record<string, SpritesheetFrameData>) => {
  const frameValues = Object.values(frames);
  if (frameValues.length === 0) {
    return { x: 0, y: 0, w: 0, h: 0 };
  }

  const minX = Math.min(...frameValues.map((frame) => frame.spriteSourceSize.x));
  const minY = Math.min(...frameValues.map((frame) => frame.spriteSourceSize.y));
  const maxX = Math.max(...frameValues.map((frame) => frame.spriteSourceSize.x + frame.spriteSourceSize.w));
  const maxY = Math.max(...frameValues.map((frame) => frame.spriteSourceSize.y + frame.spriteSourceSize.h));

  return {
    x: minX,
    y: minY,
    w: Math.max(1, maxX - minX),
    h: Math.max(1, maxY - minY),
  };
};

export const loadSpritesheetBundle = async (
  bundleId: string,
  manifestUrl: string,
): Promise<LoadedSpritesheetBundle> => {
  const basePath = manifestUrl.substring(0, manifestUrl.lastIndexOf("/") + 1);
  const manifestFileName = manifestUrl.split("/").pop() ?? "";
  const manifestBaseName = manifestFileName.replace(/\.json(?:\?.*)?$/i, "");

  const manifestResponse = await fetch(manifestUrl);
  if (!manifestResponse.ok) {
    throw new Error(`Manifest tidak ditemukan: ${manifestUrl}`);
  }
  const manifestData: SpritesheetManifest | SpritesheetJson = await manifestResponse.json();

  if (isSpritesheetJson(manifestData)) {
    const frameNames = Object.keys(manifestData.frames).sort((a, b) => getFrameIndex(a) - getFrameIndex(b));
    const imageUrl = `${basePath}${manifestBaseName}.png`;
    const image = await loadImage(imageUrl);
    const firstFrame = frameNames[0] ? manifestData.frames[frameNames[0]] : null;
    const frameSize = manifestData.meta.frameSize ?? firstFrame?.sourceSize ?? firstFrame?.frame ?? { w: 0, h: 0 };
    const totalFrames = frameNames.length;
    const trimBounds = getTrimBounds(manifestData.frames);
    const manifest: SpritesheetManifest = {
      app: "SpineBones",
      version: "1.0",
      totalFrames,
      fps: 60,
      sheets: [
        {
          index: 0,
          frameStart: 0,
          frameEnd: Math.max(0, totalFrames - 1),
          image: `${manifestBaseName}.png`,
          data: manifestFileName,
        },
      ],
    };

    return {
      id: bundleId,
      manifest,
      frames: manifestData.frames,
      animationFrames: frameNames,
      sheetSources: [
        {
          frameStart: 0,
          frameEnd: Math.max(0, totalFrames - 1),
          image,
        },
      ],
      totalFrames,
      fps: manifest.fps,
      frameSize,
      trimBounds,
    };
  }

  const manifest = manifestData;

  const allFrames: Record<string, SpritesheetFrameData> = {};
  const sheetSources: LoadedSheetSource[] = [];
  let frameSize = { w: 0, h: 0 };

  for (const sheet of manifest.sheets) {
    const dataUrl = basePath + sheet.data;
    const imageUrl = basePath + sheet.image;

    const [sheetJson, sheetImage] = await Promise.all([
      fetch(dataUrl).then((res) => {
        if (!res.ok) throw new Error(`Sheet data tidak ditemukan: ${dataUrl}`);
        return res.json() as Promise<SpritesheetJson>;
      }),
      loadImage(imageUrl),
    ]);

    Object.assign(allFrames, sheetJson.frames);

    if (sheetJson.meta.frameSize) {
      frameSize = sheetJson.meta.frameSize;
    }

    sheetSources.push({
      frameStart: sheet.frameStart,
      frameEnd: sheet.frameEnd,
      image: sheetImage,
    });
  }

  const animationFrames = Array.from({ length: manifest.totalFrames }, (_, i) =>
    `frame_${String(i).padStart(4, "0")}`,
  );
  const trimBounds = getTrimBounds(allFrames);

  return {
    id: bundleId,
    manifest,
    frames: allFrames,
    animationFrames,
    sheetSources,
    totalFrames: manifest.totalFrames,
    fps: manifest.fps,
    frameSize,
    trimBounds,
  };
};
