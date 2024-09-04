import { Outlet, Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  VscSymbolProperty,
  VscBeaker,
  VscTerminalPowershell
} from "react-icons/vsc";
import { IconType } from "react-icons";

class Page {
  icon: IconType;
  path: string;
  title: string;

  constructor(title: string, path: string, icon: IconType) {
    this.icon = icon;
    this.path = path;
    this.title = title;
  }

  toElement() {
    const location = useLocation();

    const linkClass = "hover:text-primary w-10 h-10 tooltip tooltip-right";
    const selectedClass = "text-primary";
    const defaultClass = "w-10 h-7";

    return (
      <Link
        className={linkClass}
        data-tip={this.title}
        to={this.path}
        key={"pagekey_" + this.title}
      >
        <this.icon
          className={clsx(defaultClass, {
            [selectedClass]: location.pathname === this.path
          })}
        />
      </Link>
    );
  }
}

export default function Layout() {
  const topPages: Page[] = [new Page("Instances", "/", VscBeaker)];
  const bottomPages: Page[] = [
    new Page("Settings", "/settings", VscSymbolProperty),
    new Page("Console", "/console", VscTerminalPowershell)
  ];

  return (
    <div className="flex flex-row min-w-screen min-h-screen overflow-hidden">
      <div className="w-14 bg-base-200 flex flex-col gap-3 px-2 pt-3">
        {topPages.map((page) => page.toElement())}
        <div className="flex-grow" />
        {bottomPages.map((page) => page.toElement()).reverse()}
      </div>
      <div className="w-screen h-screen">
        <Outlet />
      </div>
    </div>
  );
}
