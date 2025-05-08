import { ReactNode, useEffect, useState } from "react";
import InstanceComponent, { Instance } from "../components/Instance";
import { invoke } from "@tauri-apps/api/core";
import { normalizeFilename } from "../utils/FilenameUtils";
import { createWindow } from "../utils/Window";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

type Instances = {
  instances: Instance[];
  version: number;
};

class BarElement {
  label: string;
  path: string;
  title: string;

  constructor(label: string, path: string, title: string) {
    this.label = label;
    this.path = path;
    this.title = title;
  }

  on_click() {
    createWindow(normalizeFilename(this.label), {
      title: this.title,
      url: window.location.origin + this.path
    });
  }

  toElement() {
    const location = useLocation();

    // const linkClass = "w-auto h-10 tooltip tooltip-bottom";
    // const selectedClass = "text-primary shadow-primary shadow-md";
    // const unselectedClass = "shadow-base-300 shadow-lg";
    // const defaultClass = "w-max h-10 bg-base-200 hover:text-primary transition-all";

    return (
      <li>
        <a /*className={linkClass}*/ data-tip={this.title} onClick={() => this.on_click()} key={"bar_" + this.label}>
          <div
            className={
              clsx()
              // "btn text-center"
              // defaultClass,
              // location.pathname === this.path ? selectedClass : unselectedClass
            }
          >
            {this.title}
          </div>
        </a>
      </li>
    );
  }
}

export default function MainPage() {
  const topPages: BarElement[] = [
    new BarElement("Add", "/add", "Add"),
    new BarElement("Settings", "/settings", "Settings")
  ];

  const [instances, setInstances] = useState<ReactNode[]>();

  useEffect(() => {
    (async () => {
      const i = await invoke<Instances>("fetch_instances");
      setInstances(i.instances.map((v, i) => <InstanceComponent instanceData={v} key={v.name + i} />));
    })();
  }, []);

  return (
    <div className="flex flex-col min-w-screen min-h-screen overflow-hidden">
      <div className="navbar bg-base-200/30 border-b w-full">
        <div className="navbar-start">
          <ul className="menu menu-horizontal px-2 py-0 gap-3">{topPages.map((page) => page.toElement())}</ul>
        </div>
        <div className="navbar-end">
          <div className="btn btn-ghost w-10 h-10 p-2" onClick={() => window.location.reload()} />
        </div>
      </div>

      <div
        className="grid gap-3 p-3 overflow-y-auto"
        style={{
          maxHeight: "85vh",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))"
        }}
      >
        {instances ? instances : <div className="loading loading-ball loading-lg fixed left-1/2 bottom-1/2" />}
      </div>
    </div>
  );
}
