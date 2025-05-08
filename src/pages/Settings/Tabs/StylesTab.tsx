import clsx from "clsx";
import { useSettingsContext } from "../../../context/SettingsProvider";
import { emit } from "@tauri-apps/api/event";

const themes = ["dark", "dim", "coffee", "night", "dracula", "black", "wireframe", "light", "cupcake"];

export default function StylesTab() {
  const { setTheme, theme: currentTheme } = useSettingsContext();

  function set_theme(theme: string) {
    console.log("меняем тему ахуеть!");
    emit("theme-changed", { theme });
    setTheme(theme);
  }

  return (
    <>
      <h1 className="bg-transparent">
        Здесь вы можете выбрать любую интересующую вас тему и хоть обосраться тыкая кнопошки
      </h1>
      <div
        className="rounded-box p-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 overflow-y-auto"
        style={{ maxHeight: "86vh" }}
      >
        {themes.map((theme) => {
          return (
            <div
              key={theme}
              data-theme={theme}
              className={clsx(
                "hover:bg-base-300 p-2 rounded-md cursor-pointer font-sans select-none border-2 transition-colors",
                currentTheme == theme ? "border-accent" : "border-secondary border-opacity-30"
              )}
              onClick={() => set_theme(theme)}
            >
              <div className="grid grid-cols-2">
                <div className={clsx("font-bold", currentTheme === theme && "text-accent")}>{theme}</div>
                <div className="flex flex-row-reverse w-full gap-1">
                  <span className="bg-neutral rounded-badge w-2" />
                  <span className="bg-accent rounded-badge w-2" />
                  <span className="bg-secondary rounded-badge w-2" />
                  <span className="bg-primary rounded-badge w-2" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
