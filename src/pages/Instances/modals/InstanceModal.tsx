import { Child } from "@tauri-apps/plugin-shell";
import { useConsoleContext } from "../../../context/ConsoleProvider";
import { firstLetterUpperCase } from "../../../utils/Utilities";
import { PackageFile, runPackageMain } from "../utils/InstanceManager";

export default function InstanceModal({
  pkg,
  setChild,
  child
}: {
  pkg: PackageFile;
  setChild: (child: Child | undefined) => void;
  child: Child | undefined;
}) {
  const logCtx = useConsoleContext();

  async function runBot() {
    if (!pkg) return;
    console.log("пакет есть");

    if (false) return;
    console.log("похожего пидора нет");

    const result = await runPackageMain(pkg);
    if (!result) return console.log("Нет цели");
    console.log("всо есть");

    const [Command, Child] = result;

    logCtx.deleteLog(pkg.name);
    Command.stdout.on("data", (data) => {
      logCtx.pushLog(pkg.name, [data]);
      console.log(pkg.name, data);
    });

    setChild(Child);
  }

  function onClickRun() {
    runBot();
  }

  function onClickStop() {
    if (!child) return;
    child.kill();
    setChild(undefined);
  }

  return (
    <div className="modal-box">
      <div>
        <h1 className="font-sans font-bold text-xl">
          {firstLetterUpperCase(pkg.name)}
        </h1>
        {pkg.version && <h2>Версия: {pkg.version}</h2>}
        {(pkg.author || pkg.authors) && (
          <h2>Авторы: {pkg.author ?? pkg.authors?.join(", ")}</h2>
        )}
        <div>Статус: {child ? "Запущен" : "Выключен"}</div>
      </div>
      <div className="modal-action">
        <button
          className="btn btn-primary"
          onClick={onClickRun}
          disabled={child ? true : false}
        >
          Запуск
        </button>
        <button
          className="btn btn-outline"
          onClick={onClickStop}
          disabled={child ? false : true}
        >
          Стоп
        </button>
      </div>
    </div>
  );
}
