import { useSearchParams } from "react-router-dom";
import { SideBar, SideBarElement } from "../../utils/UtilElements";
import { HiOutlineCommandLine, HiOutlineInformationCircle, HiOutlineCog6Tooth } from "react-icons/hi2";
import ConsoleTab from "./Tabs/ConsoleTab";

export default function InstancePage() {
  const [params, _setParams] = useSearchParams();
  const id = Number(params.get("id"));

  const topElements = [
    new SideBarElement("Console", HiOutlineCommandLine, <ConsoleTab />),
    new SideBarElement("Version", HiOutlineInformationCircle, <div className="tab-content">B</div>),
    new SideBarElement("Settings", HiOutlineCog6Tooth, <div className="tab-content">C</div>)
  ];

  return <SideBar top={topElements} bottom={[]}></SideBar>;
}
