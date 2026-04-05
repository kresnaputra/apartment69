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

export const loadSpritesheetBundle = async (
  bundleId: string,
  manifestUrl: string,
): Promise<LoadedSpritesheetBundle> => {
  const basePath = manifestUrl.substring(0, manifestUrl.lastIndexOf("/") + 1);

  const manifestResponse = await fetch(manifestUrl);
  if (!manifestResponse.ok) {
    throw new Error(`Manifest tidak ditemukan: ${manifestUrl}`);
  }
  const manifest: SpritesheetManifest = await manifestResponse.json();

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

  return {
    id: bundleId,
    manifest,
    frames: allFrames,
    animationFrames,
    sheetSources,
    totalFrames: manifest.totalFrames,
    fps: manifest.fps,
    frameSize,
  };
};
