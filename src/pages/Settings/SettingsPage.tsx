import DebugTab from "./Tabs/DebugTab";
import LanguagesTab from "./Tabs/LanguagesTab";
import StylesTab from "./Tabs/StylesTab";

function TabInput({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
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

export default function SettingsPage() {
  const tabContentClass = "tab-content border-base-300 bg-base-100";

  return (
    <div role="tablist" className="tabs tabs-border h-screen">
      <TabInput label={"Styles"} defaultChecked />
      <div role="tabpanel" className={tabContentClass}>
        <StylesTab />
      </div>
      <TabInput label={"Debug"} />
      <div role="tabpanel" className={tabContentClass}>
        <DebugTab />
      </div>
      <TabInput label={"Languages"} />
      <div role="tabpanel" className={tabContentClass}>
        <LanguagesTab />
      </div>
    </div>
  );
}
