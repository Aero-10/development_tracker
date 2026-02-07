// components/items/ItemCard.jsx
import StatusPill from "./StatusPill";

export default function ItemCard({ item, onClick }) {
  return (
    <div
      onClick={() => onClick(item)}
      className="
        rounded-xl
        bg-zinc-900
        border border-zinc-800
        p-4
        transition
        hover:border-zinc-700
        hover:bg-zinc-900/80
        cursor-pointer
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-medium text-white">{item.title}</h4>
          <p className="text-xs text-zinc-400 mt-1">
            {item.type}
          </p>
        </div>

        <StatusPill status={item.status} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span
          className={`w-2 h-2 rounded-full ${
            item.priority === "High"
              ? "bg-red-500"
              : item.priority === "Medium"
              ? "bg-yellow-400"
              : "bg-zinc-400"
          }`}
        />
        <p className="text-xs text-zinc-400">
          {item.priority} priority
        </p>
      </div>
    </div>
  );
}
