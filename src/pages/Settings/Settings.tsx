import DebugTab from "./Tabs/Debug";
import LanguagesTab from "./Tabs/Languages";
import StylesTab from "./Tabs/Styles";

function TabInput({
  label,
  defaultChecked = false
}: {
  label: string;
  defaultChecked?: boolean;
}) {
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

export default function Settings() {
  const tabContentClass = "tab-content bg-base-100 border-base-300";

  return (
    <div role="tablist" className="tabs tabs-bordered">
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
