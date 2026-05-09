import type {
  LoadedFrameBitmap,
  LoadedSpritesheetBundle,
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

  const frameBitmaps: LoadedFrameBitmap[] = new Array(manifest.totalFrames);
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

    if (sheetJson.meta.frameSize) {
      frameSize = sheetJson.meta.frameSize;
    }

    await Promise.all(
      Array.from({ length: sheet.frameEnd - sheet.frameStart + 1 }, async (_, idx) => {
        const frameIndex = sheet.frameStart + idx;
        const frameName = `frame_${String(frameIndex).padStart(4, "0")}`;
        const frameData = sheetJson.frames[frameName];
        if (!frameData) return;

        const { x, y, w, h } = frameData.frame;
        const bitmap = await createImageBitmap(sheetImage, x, y, w, h);
        frameBitmaps[frameIndex] = {
          bitmap,
          spriteSourceSize: frameData.spriteSourceSize,
          sourceSize: frameData.sourceSize ?? frameSize,
        };
      }),
    );
  }

  return {
    id: bundleId,
    manifest,
    frameBitmaps,
    totalFrames: manifest.totalFrames,
    fps: manifest.fps,
    frameSize,
  };
};
