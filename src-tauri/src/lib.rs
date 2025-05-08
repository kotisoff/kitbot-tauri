mod instances_loader;
mod run_bot;
mod tray;

use instances_loader::fetch_instances;
use run_bot::run_bot;
use tray::settings_hide_on_close;

#[tauri::command]
async fn create_window(app: tauri::AppHandle, label: String, url: String) {
  tauri::WebviewWindowBuilder::new(&app, label, tauri::WebviewUrl::App(url.as_str().into()))
    .build()
    .unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let mut builder = tauri::Builder::default()
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_process::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![
      run_bot,
      fetch_instances,
      settings_hide_on_close,
      create_window
    ]);

  builder = tray::use_builder(builder);

  builder
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
