import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getAllWindows } from "@tauri-apps/api/window";
import clsx from "clsx";

export type Instance = {
  name: string;
  path: string;
  run: string;
};

export default function InstanceComponent({ instanceData }: { instanceData: Instance }) {
  async function on_click() {
    const windows = await getAllWindows();

    const bot_window =
      windows.find((win) => win.label == instanceData.name) ??
      new WebviewWindow(instanceData.name, {
        title: "Окно " + instanceData.name + " - KitBot App",
        url: "https://google.com",
        width: 200,
        height: 200
      });

    bot_window.once("tauri://webview-created", () => {
      console.log("Ахуй тотальный");
    });

    bot_window.show();
    bot_window.unminimize();
    bot_window.setFocus();
  }

  return (
    <>
      <div className="indicator">
        <span
          className={clsx("indicator-item badge badge-sm m-1", false ? "badge-primary" : "badge-ghost shadow-sm")}
        />
        <div
          className="btn btn-ghost shadow-lg transition-colors rounded-box bg-base-300 w-40 h-40"
          onClick={() => on_click}
        >
          <div>
            {instanceData.name}
            {instanceData.path}
          </div>
        </div>
      </div>
    </>
  );
}
