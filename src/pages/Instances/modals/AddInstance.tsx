import clsx from "clsx";
import { useState } from "react";
import * as dialog from "@tauri-apps/plugin-dialog";
import { VscFolder } from "react-icons/vsc";
import {
  InstanceType,
  isNJSProject,
  scanPackage,
  writeInstances
} from "../utils/InstanceManager";

export default function AddInstanceModal({
  instancesData
}: {
  instancesData: InstanceType[];
}) {
  const [selectedPath, setPath] = useState<string>("");
  const [buttonState, setButtonState] = useState(false);

  const openDirectory = async () => {
    const directory = (await dialog.open({
      directory: true,
      recursive: true
    })) as string;

    setPath(directory);

    const isInstance = await isNJSProject(directory);
    setButtonState(true && isInstance);
  };

  return (
    <div className="modal-box">
      <h1 className="modal-top text-lg font-bold mb-3">Добавление бота</h1>

      <h3 className="text-md">Выберите папку бота</h3>
      <div className="input input-bordered w-full bg-base-200 flex flex-row">
        <VscFolder
          className="w-8 h-11 py-1 pr-2 hover:text-primary cursor-pointer"
          onClick={openDirectory}
        />
        <h3 className="text-md h-full relative top-2.5 select-none">
          {selectedPath}
        </h3>
      </div>
      <br />

      <div className="modal-action">
        <form method="dialog">
          <button
            className={clsx("btn btn-primary mx-2")}
            onClick={() => {
              scanPackage(selectedPath).then(console.log);
              writeInstances([...instancesData, { path: selectedPath }]).then(
                () => window.location.reload()
              );
            }}
            disabled={!buttonState}
          >
            Добавить
          </button>
          <button className="btn">Отмена</button>
        </form>
      </div>
    </div>
  );
}
