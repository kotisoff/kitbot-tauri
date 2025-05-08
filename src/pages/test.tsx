import { InstanceGrid } from "../components/InstanceGrid";

const instances = [
  { name: "1.16.5", tag: "Fabric" },
  { name: "1.18.2 Industrial", tag: "Forge" },
  { name: "SevTech: Ages" },
  { name: "Кишмиш из трусов 1.16.5", tag: "Forge" },
  { name: "Prominence II RPG" }
  // добавь остальные...
];

export default function Test() {
  return (
    <div className="bg-base-300 min-h-screen p-6">
      <InstanceGrid instances={instances} />
    </div>
  );
}
