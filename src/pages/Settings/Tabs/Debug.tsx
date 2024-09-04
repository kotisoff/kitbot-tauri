import fs from "@tauri-apps/plugin-fs";
import path from "@tauri-apps/api/path";
import shell from "@tauri-apps/plugin-shell";

export default function DebugTab() {
  const deleteAppDataDir = async () => {
    const v = await path.appDataDir();
    return fs
      .remove(v, { recursive: true })
      .then(() => alert("Данные приложения удалены успешно!"))
      .catch((reason) =>
        alert("Не удалось удалить данные приложения\n" + reason)
      );
  };

  const openAppDataDir = async () => {
    return path.appDataDir().then(shell.open);
  };

  return (
    <div className="max-h-screen flex flex-wrap gap-2 p-3 transition-color">
      <button className="btn" onClick={deleteAppDataDir}>
        Удалить данные приложения
      </button>

      <button className="btn" onClick={openAppDataDir}>
        Открыть папку данных приложения
      </button>
    </div>
  );
}
