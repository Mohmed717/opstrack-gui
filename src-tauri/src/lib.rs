#[derive(serde::Serialize)]
struct AppInfo {
    name: &'static str,
    version: &'static str,
    phase: &'static str,
    platform: &'static str,
}

#[tauri::command]
fn app_info() -> AppInfo {
    AppInfo {
        name: "OpsTrack Cockpit",
        version: env!("CARGO_PKG_VERSION"),
        phase: "Phase 0 · desktop scaffold",
        platform: std::env::consts::OS,
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![app_info])
        .run(tauri::generate_context!())
        .expect("error while running OpsTrack Cockpit");
}
