use std::process;

use tauri::{
  menu::{Menu, MenuItem},
  tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
  Manager, Wry,
};

static mut HIDE_APP: bool = true;

pub fn use_builder(builder: tauri::Builder<Wry>) -> tauri::Builder<Wry> {
  builder
    .setup(|app| create_tray(app))
    .on_window_event(|window, event| match event {
      tauri::WindowEvent::CloseRequested { api, .. } => {
        if unsafe { HIDE_APP } && window.label() == "main" {
          window.hide().unwrap();
          api.prevent_close();
        } else if window.label() == "main" {
          process::exit(0);
        }
      }

      _ => {}
    })
    .on_tray_icon_event(|app, event| match event {
      TrayIconEvent::Click {
        id: _,
        position: _,
        rect: _,
        button,
        button_state: _,
      } => match button {
        MouseButton::Left => {
          let агде = app.get_webview_window("main");
          match агде {
            Some(win) => {
              win.show().unwrap();
              win.unminimize().unwrap();
              win.set_focus().unwrap();
            }
            None => {}
          }
        }

        _ => {}
      },

      _ => {}
    })
}

fn create_tray(app: &tauri::App) -> Result<(), Box<dyn std::error::Error>> {
  let mut tray = TrayIconBuilder::new().icon(app.default_window_icon().unwrap().clone());

  let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>).unwrap();

  let menu = Menu::with_items(app, &[&quit_i]).unwrap();

  tray = tray.menu(&menu).show_menu_on_left_click(false);

  tray = tray.on_menu_event(|app, event| match event.id.as_ref() {
    "quit" => {
      app.exit(0);
    }

    _ => {
      println!("Ахуеть ты чё");
    }
  });

  tray.build(app).unwrap();

  Ok(())
}

#[tauri::command]
pub fn settings_hide_on_close(state: bool) {
  unsafe {
    HIDE_APP = state;
  }
}
