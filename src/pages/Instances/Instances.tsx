import { VscRefresh } from "react-icons/vsc";
import { ReactNode, useEffect, useRef, useState } from "react";
import AddInstanceModal from "./modals/AddInstance";
import { loadInstances } from "./utils/InstanceManager";
import type { InstanceType } from "./utils/InstanceManager";
import Instance from "./components/Instance";

export default function InstancesPage() {
  const [instances, setInstances] = useState<ReactNode[]>([]);
  const [instancesData, setInstancesData] = useState<InstanceType[]>([]);

  useEffect(() => {
    (async () => {
      if (instances.length) return;

      setInstancesData(await loadInstances());
      setInstances(
        instancesData.map((v) => (
          <Instance instanceData={v} key={"instance_" + crypto.randomUUID()} />
        ))
      );
    })();
  });

  const modal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="navbar bg-base-200/30 border-b w-full">
        <div className="navbar-start flex">
          <ul className="menu menu-horizontal px-2 py-0">
            <li>
              <a className="btn" onClick={() => modal.current?.showModal()}>
                {"Add"}
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-center grid grid-rows-2 text-center">
          <h2 className="font-bold text-md">{"Bots"}</h2>
          <h2 className="text-sm">{"All added bots will right here."}</h2>
        </div>
        <div className="navbar-end">
          <VscRefresh
            className="btn btn-ghost w-10 h-10 p-2"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>

      <div
        className="grid gap-3 p-3 overflow-y-auto"
        style={{
          maxHeight: "85vh",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))"
        }}
      >
        {instances.length ? (
          instances
        ) : (
          <div className="loading loading-ball loading-lg fixed left-1/2 bottom-1/2" />
        )}
      </div>

      <dialog className="modal" ref={modal}>
        <AddInstanceModal instancesData={instancesData} />
      </dialog>
    </>
  );
}
