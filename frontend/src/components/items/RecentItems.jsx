import ItemCard from "./ItemCard";
import { useState } from "react";
import ItemDetailsPanel from "./ItemDetailsPanel";
import { useItems } from "../../context/ItemsContext";

export default function RecentItems({ limit = 4 }) {
  const { filteredItems, updateItem } = useItems();
  const [selectedItem, setSelectedItem] = useState(null);

  const recentItems = [...filteredItems]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, limit);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {selectedItem && (
        <ItemDetailsPanel
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onItemUpdated={(updated) => {
            setSelectedItem(updated);
            updateItem(updated._id, updated);
          }}
        />
      )}
      {recentItems.length === 0 && (
        <p className="text-zinc-400 col-span-full mt-4">No items match the selected filters.</p>
      )}
    </>
  );
}
