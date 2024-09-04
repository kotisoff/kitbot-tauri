import { useEffect, useRef, useState } from "react";
import {
  InstanceType,
  PackageFile,
  scanPackage
} from "../utils/InstanceManager";
import clsx from "clsx";
import { Child } from "@tauri-apps/plugin-shell";
import { firstLetterUpperCase } from "../../../utils/Utilities";
import InstanceModal from "../modals/InstanceModal";

export default function Instance({
  instanceData
}: {
  instanceData: InstanceType;
}) {
  const [child, setChild] = useState<Child>();

  // Get package info
  const [pkg, setPkg] = useState<PackageFile>();
  useEffect(() => {
    if (pkg) return;

    (async () => {
      const pkg = await scanPackage(instanceData.path);
      setPkg(pkg);
    })();
  });

  useEffect(() => {
    console.log("Child changed", pkg?.name);
    if (child) console.log(child.write("message"));
  }, [child]);

  const instanceModal = useRef<HTMLDialogElement>(null);

  function onClick() {
    instanceModal.current?.showModal();
    console.log(instanceModal);
  }

  return (
    <>
      <div className="indicator">
        <span
          className={clsx(
            "indicator-item badge badge-sm m-1",
            child ? "badge-primary" : "badge-ghost shadow-sm"
          )}
        />
        <div
          className="btn btn-ghost shadow-lg transition-colors rounded-box bg-base-300 w-40 h-40"
          onClick={onClick}
        >
          {pkg ? (
            <div>
              {firstLetterUpperCase(pkg.name)}
              {pkg.version && (
                <>
                  <br />
                  {pkg.version}
                </>
              )}
            </div>
          ) : (
            <div className="loading loading-spinner" />
          )}
        </div>
      </div>

      <dialog className="modal" ref={instanceModal}>
        {pkg && <InstanceModal pkg={pkg} setChild={setChild} child={child} />}
      </dialog>
    </>
  );
}
