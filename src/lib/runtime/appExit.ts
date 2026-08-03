import { Capacitor } from "@capacitor/core";

// The mobile menu layout can render inside either the Tauri desktop shell
// (narrow window) or the Capacitor Android app, which have no Tauri runtime
// and need a different native exit call — window.close() silently fails there.
export const exitApp = async () => {
  if (Capacitor.isNativePlatform()) {
    const { App } = await import("@capacitor/app");
    await App.exitApp();
    return;
  }

  const { getCurrentWindow } = await import("@tauri-apps/api/window");
  await getCurrentWindow().close();
};
