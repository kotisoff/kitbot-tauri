import { invoke } from "@tauri-apps/api/core";
import { getAllWebviewWindows, WebviewWindow } from "@tauri-apps/api/webviewWindow";

type WindowOptions = {
  title?: string;
  url?: string;
};

async function findWindow(label: string) {
  return (await getAllWebviewWindows()).find((w) => w.label == label);
}

function format_window_name(title: string) {
  return `${title} - KitBot App`;
}

export async function useWindow(label: string, options?: WindowOptions) {
  let window = await findWindow(label);
  if (!window) {
    await invoke("create_window", {
      label,
      url: options?.url ?? "index.html",
      title: format_window_name(options?.title ?? label)
    });
    window = (await findWindow(label)) as WebviewWindow;
  }

  window.unminimize();
  window.setFocus();
  return window;
}
