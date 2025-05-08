export default function LanguagesTab() {
  const langs = [
    ["en_us", { _name: "English" }],
    ["ru_ru", { _name: "Русский" }]
  ] as [id: string, localizations: { [index: string]: string; _name: string }][];

  return (
    <div className="max-h-screen flex flex-wrap gap-2 p-3 transition-color">
      <div style={{ height: "80vh", width: "80vw" }}>
        <table className="table table-pin-rows">
          <tbody>
            {langs.map(([id, v]) => (
              <tr key={id}>
                <td className="btn w-full my-px" onClick={() => alert("Nothing happened. i18nano is not setup.")}>
                  {v._name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
