export type PixiWarmupResult = {
  ready: boolean;
  version: string;
  note: string;
};

export const warmPixiBridge = async (): Promise<PixiWarmupResult> => {
  const pixi = await import("pixi.js");

  return {
    ready: true,
    version: pixi.VERSION,
    note: "Pixi berhasil dimuat dan siap dipakai sebagai jalur renderer lanjutan.",
  };
};
