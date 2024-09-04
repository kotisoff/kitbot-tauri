import { useConsoleContext } from "../context/ConsoleProvider";

export default function ConsolePage() {
  const ConsoleContext = useConsoleContext();
  const logs = ConsoleContext.logs;

  const tabContentClass = "tab-content bg-base-100 border-base-300";

  return (
    <div role="tablist" className="tabs tabs-bordered">
      {Object.entries(logs).length ? (
        Object.entries(logs).map(([key, log], index) => (
          <>
            <input
              key={"tab_" + key}
              type="radio"
              name="consoleTab"
              role="tab"
              className="tab"
              aria-label={key}
              defaultChecked={index === 0}
            />
            <div
              role="tabpanel"
              className={tabContentClass}
              key={"tabc_" + key}
            >
              <div
                className="p-3 m-3 bg-base-300 rounded-box overflow-y-auto overflow-x-auto"
                style={{ height: "90vh" }}
              >
                {log?.map((v, i) => (
                  <pre key={i}>{v}</pre>
                ))}
              </div>
            </div>
          </>
        ))
      ) : (
        <h3 className="text-2xl font-bold fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-center">
          В данный момент ни один бот не активен.
        </h3>
      )}
    </div>
  );
}
