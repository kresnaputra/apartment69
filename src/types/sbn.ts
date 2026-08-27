export type SbnManifest = {
  app?: string;
  version?: string;
  format?: string;
  archiveVersion?: string;
  projectFile?: string;
  assetsDir?: string;
  thumbnailFile?: string;
  createdAt?: string;
};

export type SbnKeyframe = {
  x?: number;
  y?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut" | string;
};

export type SbnBone = {
  id: number;
  name: string;
  x: number;
  y: number;
  length: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  parentId: number | null;
  skinId?: number;
  _wx?: number;
  _wy?: number;
  _wrot?: number;
  easing?: string;
};

export type SbnSlot = {
  id: number;
  name: string;
  boneId: number;
  color?: string;
  attachmentName: string | null;
  drawOrder: number;
};

export type SbnMeshVertex = {
  x: number;
  y: number;
  u: number;
  v: number;
};

export type SbnAttachment = {
  name: string;
  type: string;
  imagePath?: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  slotId: number;
  opacity?: number;
  opaqueBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  imageIsCropped?: boolean;
  assetPath?: string;
  imageData?: string;
  meshVertices?: SbnMeshVertex[];
  meshTriangles?: number[][];
  meshGrid?: { columns: number; rows: number };
  mesh?: {
    vertices?: SbnMeshVertex[];
    triangles?: number[][];
    grid?: { columns: number; rows: number };
  };
};

export type SbnSkin = {
  id: number;
  name: string;
  color?: string;
};

export type SbnSetupPose = Record<
  string,
  {
    x?: number;
    y?: number;
    rotation?: number;
    scaleX?: number;
    scaleY?: number;
  }
>;

export type SbnProject = {
  name?: string;
  version?: string;
  bones: SbnBone[];
  boneGroups?: unknown[];
  skins: SbnSkin[];
  activeSkinId?: number;
  ikChainRootIds?: number[];
  setupPose?: SbnSetupPose;
  slots: SbnSlot[];
  attachments: SbnAttachment[];
  keyframes?: Record<string, Record<string, SbnKeyframe>>;
  meshDeformKeyframes?: Record<string, Record<string, { vertices: Array<{ x: number; y: number }> }>>;
  duration: number;
  fps?: number;
  backgroundImage?: string | null;
  backgroundAssetPath?: string | null;
  audioData?: string | null;
  audioName?: string | null;
  audioVolume?: number;
  audioOffsetFrames?: number;
  attachmentDrawOrderOverrides?: Record<string, number>;
};

export type LoadedSbnBundle = {
  fileName: string;
  manifest: SbnManifest | null;
  thumbnailDataUrl: string | null;
  project: SbnProject;
};

export type WorldBone = SbnBone & {
  _wx: number;
  _wy: number;
  _wrot: number;
};

export type SceneBounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  centerX: number;
  centerY: number;
  zoom: number;
};

export type RendererSnapshot = {
  frame: number;
  fps: number;
  scale: number;
  camera: SceneBounds;
};
