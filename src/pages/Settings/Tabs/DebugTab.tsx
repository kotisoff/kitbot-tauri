import { useSettingsContext } from "../../../context/SettingsProvider";

export default function DebugTab() {
  const ctx = useSettingsContext();

  return (
    <div className="max-h-screen flex flex-wrap gap-2 p-3 transition-color">
      <button className="btn">Удалить данные приложения</button>

      <button className="btn">Открыть папку данных приложения</button>

      <button className="btn" onClick={() => ctx.setHideOnClose(!ctx.hideOnClose)}>
        Прятать приложение при закрытии: {ctx.hideOnClose.toString()}
      </button>
    </div>
  );
}
