use tauri::{image::Image, Manager};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let app_icon = Image::from_bytes(include_bytes!("../icons/icon.png"))
    .expect("gagal memuat ikon aplikasi")
    .to_owned();
  let mut context = tauri::generate_context!();
  context.set_default_window_icon(Some(app_icon.clone()));

  tauri::Builder::default()
    .setup(move |app| {
      if let Some(window) = app.get_webview_window("main") {
        window.set_icon(app_icon.clone())?;
      }

      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(context)
    .expect("error while running tauri application");
}
