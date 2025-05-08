import { ReactNode, useEffect, useState } from "react";
import InstanceComponent, { Instance } from "../components/Instance";
import { invoke } from "@tauri-apps/api/core";
import { normalizeFilename } from "../utils/FilenameUtils";
import { useWindow } from "../utils/Window";

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
    useWindow(normalizeFilename(this.label), {
      title: this.title,
      url: this.path
    });
  }

  toElement() {
    return (
      <li className="w-auto" data-tip={this.title} onClick={() => this.on_click()} key={"bar_" + this.label}>
        <a>{this.title}</a>
      </li>
    );
  }
}

export default function MainPage() {
  const topPages: BarElement[] = [
    new BarElement("add_instance", "/add", "Add Instance"),
    new BarElement("settings", "/settings", "Settings"),
    new BarElement("test", "/test", "Test Playground")
  ];

  const [instances, setInstances] = useState<ReactNode[]>();

  useEffect(() => {
    (async () => {
      const i = await invoke<Instances>("fetch_instances");

      setInstances(i.instances.map((v, i) => <InstanceComponent instanceData={{ ...v, id: i }} key={v.name + i} />));
    })();
  }, []);

  return (
    <div className="flex bg-base-200 flex-col min-w-screen min-h-screen overflow-hidden">
      {/* Navbar */}
      <div className="navbar bg-base-100 w-full">
        <ul className="menu menu-horizontal px-2 py-0 gap-3">{topPages.map((page) => page.toElement())}</ul>
        <div className="navbar-end">
          <div className="btn btn-ghost w-10 h-10 p-2" onClick={() => window.location.reload()} />
        </div>
      </div>
      {/* Content */}
      <div
        className="flex flex-row flex-wrap gap-2 p-3 scroll-m-0 overflow-y-auto"
        // style={{
        //   maxHeight: "85vh",
        //   gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))"
        // }}
      >
        {instances ? instances : <div className="loading loading-ball loading-lg fixed left-1/2 bottom-1/2" />}
      </div>
    </div>
  );
}
