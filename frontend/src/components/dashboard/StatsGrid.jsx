// components/dashboard/StatsGrid.jsx
import StatsCard from "./StatsCard";
import { FaProjectDiagram, FaBook, FaClipboardList, FaTasks } from "react-icons/fa";
import { useItems } from "../../context/ItemsContext";

export default function StatsGrid() {
  const { items } = useItems();

  const counts = {
    Projects: items.filter((i) => i.type === "Project").length,
    Subjects: items.filter((i) => i.type === "Subject").length,
    Placement: items.filter((i) => i.type === "Placement").length,
    Tasks: items.filter((i) => i.type === "Task").length,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <StatsCard title="Projects" count={counts.Projects} icon={<FaProjectDiagram />} />
      <StatsCard title="Subjects" count={counts.Subjects} icon={<FaBook />} />
      <StatsCard title="Placement" count={counts.Placement} icon={<FaClipboardList />} />
      <StatsCard title="Tasks" count={counts.Tasks} icon={<FaTasks />} />
    </div>
  );
}
