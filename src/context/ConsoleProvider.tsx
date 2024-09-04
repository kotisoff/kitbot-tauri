import { createContext, useState, useContext, ReactNode } from "react";
import { getValue, setValue } from "../utils/localStorage";

type logsType = {
  [index: string]: string[] | undefined;
};

interface ConsoleContextInterface {
  logs: logsType;
  setLogs: (logs: logsType) => void;
  pushLog: (key: string, log?: string[]) => void;
  deleteLog: (key: string) => void;
}

export const ConsoleContext = createContext<ConsoleContextInterface>({
  logs: getValue("logs") ?? {},
  setLogs: () => {},
  pushLog: () => {},
  deleteLog: () => {}
});

export const useConsoleContext = () => useContext(ConsoleContext);

export const ConsoleProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<logsType>(getValue("logs") ?? {});

  const updateStorate = () => {
    setLogs(logs);
    setValue("logs", logs);
  };

  const pushLog = (key: string, log: string[] = []) => {
    if (logs[key]) log = logs[key]?.concat(log) ?? [];
    logs[key] = log;
    updateStorate();
  };

  const deleteLog = (key: string) => {
    if (logs[key]) delete logs[key];
    updateStorate();
  };

  return (
    <ConsoleContext.Provider value={{ logs, setLogs, pushLog, deleteLog }}>
      {children}
    </ConsoleContext.Provider>
  );
};
