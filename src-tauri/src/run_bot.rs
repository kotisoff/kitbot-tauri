use serde::Serialize;
use std::{
  io::{BufRead, BufReader},
  process::{Command, Stdio},
};
use tauri::{AppHandle, Emitter};

#[derive(Serialize, Clone)]
struct BotLog {
  process: u32,
  log: String,
}

#[tauri::command]
pub fn run_bot(app: AppHandle, bot_path: &str) {
  let mut process = Command::new("cmd")
    .args(["/C", "pnpm start"])
    .stdout(Stdio::piped())
    .current_dir(bot_path)
    .spawn()
    .expect("Произошёл пиздец!!!");

  let processid = process.id();

  tauri::async_runtime::spawn(async move {
    let stdout = process.stdout.take().expect("no stdout");
    let mut lines = BufReader::new(stdout).lines();

    while let Some(event) = lines.next() {
      let line = event.unwrap();

      let log = BotLog {
        process: processid,
        log: line,
      };

      app.emit("bot_log", log).unwrap();
    }
  });
}
