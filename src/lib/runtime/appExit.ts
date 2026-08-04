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

  // getCurrentWindow().close() only closes the window — on macOS the process
  // stays resident in the Dock afterward, same as any native app with no open
  // windows. The process plugin's exit() actually terminates the app.
  const { exit } = await import("@tauri-apps/plugin-process");
  await exit(0);
};
