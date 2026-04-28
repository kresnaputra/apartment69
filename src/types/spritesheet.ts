export type SpritesheetFrameRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SpritesheetFrameData = {
  frame: SpritesheetFrameRect;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: SpritesheetFrameRect;
  sourceSize: { w: number; h: number };
  duration: number;
};

export type SpritesheetJson = {
  frames: Record<string, SpritesheetFrameData>;
  animations: { animation: string[] };
  meta: {
    app: string;
    version: string;
    image: string;
    format: string;
    size: { w: number; h: number };
    scale: string;
    frameSize: { w: number; h: number };
    fps: number;
    frameCount: number;
  };
};

export type SpritesheetManifestEntry = {
  index: number;
  frameStart: number;
  frameEnd: number;
  image: string;
  data: string;
};

export type SpritesheetManifest = {
  app: string;
  version: string;
  totalFrames: number;
  fps: number;
  sheets: SpritesheetManifestEntry[];
};

export type LoadedSheetSource = {
  frameStart: number;
  frameEnd: number;
  image: HTMLImageElement;
};

export type LoadedSpritesheetBundle = {
  id: string;
  manifest: SpritesheetManifest;
  frames: Record<string, SpritesheetFrameData>;
  animationFrames: string[];
  sheetSources: LoadedSheetSource[];
  totalFrames: number;
  fps: number;
  frameSize: { w: number; h: number };
  trimBounds: SpritesheetFrameRect;
};
