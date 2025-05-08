use serde::{Deserialize, Serialize};
use serde_json;
use std::fs;

#[derive(Deserialize, Serialize)]
pub struct Instances {
  instances: Vec<Instance>,
  version: u16,
}

#[derive(Deserialize, Serialize)]
struct Instance {
  name: String,
  path: String,
  run: String,
}

fn load_instances_config() -> Instances {
  let dir = std::env::current_exe().unwrap().join("../instances.json");
  let config_path = dir.as_path();

  let content = match fs::read_to_string(config_path) {
    Ok(c) => c,
    Err(_) => {
      let data = String::from("{\"instances\": [], \"version\": 1}");
      fs::write(config_path, &data).unwrap();
      data
    }
  };

  match serde_json::from_str(&content) {
    Ok(d) => d,
    Err(_) => Instances {
      instances: Vec::new(),
      version: 1,
    },
  }
}

#[tauri::command]
pub fn fetch_instances() -> Instances {
  let instances = load_instances_config();

  instances
}
