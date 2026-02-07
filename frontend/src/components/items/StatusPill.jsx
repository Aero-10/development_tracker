// components/items/StatusPill.jsx
const statusStyles = {
  "Not Started": "bg-zinc-800 text-zinc-300",
  "In Progress": "bg-blue-500/10 text-blue-400",
  "Completed": "bg-emerald-500/10 text-emerald-400",
};

export default function StatusPill({ status }) {
  return (
    <span
      className={`
        text-xs
        px-2.5
        py-1
        rounded-full
        font-medium
        ${statusStyles[status]}
      `}
    >
      {status}
    </span>
  );
}
