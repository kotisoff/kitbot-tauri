import { invoke } from "@tauri-apps/api/core";
import { getAllWebviewWindows, WebviewWindow } from "@tauri-apps/api/webviewWindow";

type WindowOptions = {
  title?: string;
  url?: string;
};

async function findWindow(label: string) {
  return (await getAllWebviewWindows()).find((w) => w.label == label);
}

export async function createWindow(label: string, options?: WindowOptions) {
  let window = await findWindow(label);
  if (!window) {
    await invoke("create_window", { label, url: options?.url ?? "index.html" });
    window = (await findWindow(label)) as WebviewWindow;
    window.setTitle(`${options?.title ?? label} - KitBot App`);
  }

  window.unminimize();
  window.setFocus();
  return window;
}
