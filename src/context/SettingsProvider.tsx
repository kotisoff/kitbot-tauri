import { invoke } from "@tauri-apps/api/core";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface SettingsContextInterface {
  theme: string;
  setTheme: (theme: string) => void;

  hideOnClose: boolean;
  setHideOnClose: (state: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextInterface>({
  theme: "",
  setTheme: () => {},

  hideOnClose: true,
  setHideOnClose: () => {}
});

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");
  const [hideOnClose, setHideOnClose] = useState<boolean>(localStorage.getItem("hideOnClose") == "true");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    localStorage.setItem("hideOnClose", hideOnClose.toString());
    invoke("settings_hide_on_close", { state: hideOnClose });
  }, [theme, hideOnClose]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, hideOnClose, setHideOnClose }}>
      {children}
    </SettingsContext.Provider>
  );
};
