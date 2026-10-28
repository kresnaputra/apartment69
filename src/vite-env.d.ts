/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_ADMOB?: string;
  readonly VITE_ENABLE_VOICE_ACTOR?: string;
  readonly VITE_ADMOB_ANDROID_INTERSTITIAL_ID?: string;
  readonly VITE_REVIEW_BUILD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.sbn?url" {
  const src: string;
  export default src;
}
