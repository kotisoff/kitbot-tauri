import clsx from "clsx";
import { IconType } from "react-icons/lib";
import { ReactNode } from "react";

export function TabInput({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const tabClass = "tab mx-px";
  return (
    <input
      type="radio"
      name="settingsTab"
      role="tab"
      className={tabClass}
      aria-label={label}
      defaultChecked={defaultChecked}
    />
  );
}

export class SideBarElement {
  icon: IconType;
  title: string;
  content: ReactNode;

  constructor(title: string, icon: IconType, content: ReactNode) {
    this.icon = icon;
    this.title = title;
    this.content = content;
  }

  toElement() {
    return (
      <div
        className={clsx(
          "grid grid-flow-col cursor-pointer select-none pl-2 pr-5 py-2 gap-3",
          false && "text-primary-content bg-primary"
        )}
        key={"sidebarelement_" + this.title}
      >
        <this.icon className="w-6 h-6" />
        <div className="text-shadow-sm">{this.title}</div>
      </div>
    );
  }
}

export function SideBar({ top = [], bottom = [] }: { top: SideBarElement[]; bottom: SideBarElement[] }) {
  const elements: ReactNode[] = [
    ...top.map((v) => v.toElement()),
    <div className="flex-grow" />,
    ...bottom.map((v) => v.toElement())
  ];

  const contents: ReactNode[] = [...top.map((v) => v.content), ...bottom.map((v) => v.content)];

  return (
    <div className="flex flex-row min-w-screen min-h-screen overflow-hidden">
      <div className="w-auto bg-base-200 flex flex-col">{elements}</div>
      <div className="w-screen h-screen">{contents}</div>
    </div>
  );
}
