import clsx from "clsx";
import { useWindow } from "../utils/Window";

export type Instance = {
  name: string;
  path: string;
  run: string;
  id: number;
};

export default function InstanceComponent({ instanceData }: { instanceData: Instance }) {
  async function on_click() {
    console.log(instanceData.id);
    useWindow(`instance_${instanceData.name}`, {
      title: instanceData.name,
      url: `/instance?id=${instanceData.id}`
    });
  }

  return (
    <>
      <div className="indicator">
        <span
          className={clsx(
            "indicator-item badge badge-sm m-1",
            false ? "badge-primary" : "badge-ghost bg-gray-400 shadow-sm"
          )}
        />
        <div
          className="btn btn-ghost shadow-lg transition-colors rounded-box bg-base-300 w-20 h-24"
          onClick={() => on_click()}
        >
          <div>{instanceData.name}</div>
        </div>
      </div>
    </>
  );
}
