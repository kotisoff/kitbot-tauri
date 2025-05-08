import React, { useState } from "react";

type Instance = {
  name: string;
  tag?: string;
  image?: string;
  highlight?: boolean;
};

type Props = {
  instances: Instance[];
};

const Ungrouped = "Ungrouped";

export const InstanceGrid: React.FC<Props> = ({ instances }) => {
  const grouped = instances.reduce<Record<string, Instance[]>>((acc, instance) => {
    const tag = instance.tag ?? Ungrouped;

    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(instance);
    return acc;
  }, {});

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (tag: string) => {
    setCollapsed((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  return (
    <div className="overflow-y-auto max-h-[85vh] px-4 py-3 space-y-5">
      {Object.entries(grouped)
        .sort((v) => (v[0] != Ungrouped ? 1 : -1))
        .map(([tag, items]) => {
          const isClosed = collapsed[tag];

          return (
            <div key={tag}>
              <button onClick={() => toggle(tag)} className="font-semibold mb-2 flex items-center gap-2 select-none">
                <span className={`transition-transform ${isClosed ? "rotate-0" : "rotate-90"}`}>▶</span>
                {tag}
              </button>

              {!isClosed && (
                <div
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))"
                  }}
                >
                  {items.map((instance, index) => (
                    <div
                      key={index}
                      className="btn w-40 h-28 bg-base-100 rounded-md flex flex-col items-center justify-center text-white p-2 shadow-lg hover:border-lime-400 hover:border hover:bg-lime-500/20"
                    >
                      <img
                        src={instance.image ?? "/icon.png"}
                        alt={instance.name}
                        className="w-10 h-10 mb-2 object-contain"
                      />
                      <div className="text-sm font-medium truncate w-full text-center">{instance.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};
