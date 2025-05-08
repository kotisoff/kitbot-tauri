import * as event from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { useState } from "react";

import * as shell from "@tauri-apps/plugin-shell";

type BotLog = {
  process: number;
  log: string;
};

function App() {
  const [latestLog, setLatestLog] = useState("a");

  let pid = -1;

  event.listen("bot_log", (event) => {
    const log: BotLog = event.payload as any;
    if (!log.process) return;

    setLatestLog(log.log);
    console.log(log.process, log.log);
    pid = log.process;
  });

  async function greet() {
    if (pid > 0) {
      await kill();
    }

    invoke("run_bot", { botPath: "D:/Code/js/kitbot" });
  }

  async function kill() {
    if (pid < 0) return;
    const child = new shell.Child(pid);
    console.log("Пизда копчёному", child.pid);
    child.kill();

    pid = -1;
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input id="greet-input" onChange={(e) => console.log(e.target.value)} placeholder="Enter a name..." />
        <button type="submit">Greet</button>
      </form>
      <button onClick={kill}>Kill</button>
      <p>{latestLog}</p>
    </main>
  );
}

export default App;
