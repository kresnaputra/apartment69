import JSZip from "jszip";
import type { LoadedSbnBundle, SbnAttachment, SbnManifest, SbnProject } from "@/types/sbn";

const DEFAULT_PROJECT_FILE = "project.json";
const DEFAULT_MANIFEST_FILE = "manifest.json";
const DEFAULT_THUMBNAIL_FILE = "thumbnails/preview.png";

const blobToDataUrl = async (blob: Blob) =>
  await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read blob."));
    reader.readAsDataURL(blob);
  });

const readJson = async <T>(zip: JSZip, path: string) => {
  const entry = zip.file(path);
  if (!entry) return null;
  return JSON.parse(await entry.async("string")) as T;
};

const loadOptionalDataUrl = async (zip: JSZip, path?: string | null) => {
  if (!path) return null;
  const entry = zip.file(path);
  if (!entry) return null;
  const blob = await entry.async("blob");
  return await blobToDataUrl(blob);
};

// Ekspor .sbn versi baru menyimpan mesh sebagai { mesh: { vertices, triangles, grid } },
// sedangkan renderer membaca meshVertices/meshTriangles. Ratakan supaya kedua format jalan.
const normalizeAttachmentMesh = (attachment: SbnAttachment): SbnAttachment => {
  if (attachment.meshVertices && attachment.meshTriangles) return attachment;

  const mesh = attachment.mesh;
  if (!mesh?.vertices || !mesh.triangles) return attachment;

  return {
    ...attachment,
    meshVertices: mesh.vertices,
    meshTriangles: mesh.triangles,
    meshGrid: attachment.meshGrid ?? mesh.grid,
  };
};

const hydrateProjectAssets = async (zip: JSZip, project: SbnProject) => {
  const attachments = await Promise.all(
    (project.attachments ?? []).map(async (rawAttachment) => {
      const attachment = normalizeAttachmentMesh(rawAttachment);
      if (!attachment.assetPath) return attachment;
      const imageData = await loadOptionalDataUrl(zip, attachment.assetPath);
      return imageData ? { ...attachment, imageData } : attachment;
    }),
  );

  const backgroundImage =
    (await loadOptionalDataUrl(zip, project.backgroundAssetPath)) ?? project.backgroundImage ?? null;

  return {
    ...project,
    attachments,
    backgroundImage,
    setupPose: project.setupPose ?? {},
  };
};

export const loadSbnBundle = async (source: Blob, fileName: string): Promise<LoadedSbnBundle> => {
  const zip = await JSZip.loadAsync(await source.arrayBuffer());

  const manifest =
    (await readJson<SbnManifest>(zip, DEFAULT_MANIFEST_FILE)) ??
    (await readJson<SbnManifest>(zip, "manifest.json"));

  const projectPath = manifest?.projectFile || DEFAULT_PROJECT_FILE;
  const project = await readJson<SbnProject>(zip, projectPath);
  if (!project) {
    throw new Error("Archive .sbn tidak punya project.json yang valid.");
  }

  const hydratedProject = await hydrateProjectAssets(zip, {
    ...project,
    name: project.name ?? fileName,
  });

  const thumbnailPath = manifest?.thumbnailFile || DEFAULT_THUMBNAIL_FILE;
  const thumbnailDataUrl = await loadOptionalDataUrl(zip, thumbnailPath);

  return {
    fileName,
    manifest: manifest ?? null,
    thumbnailDataUrl,
    project: hydratedProject,
  };
};

export const loadSbnBundleFromFile = async (file: File) => {
  return await loadSbnBundle(file, file.name);
};
