// components/items/ItemCardsGrid.jsx
import ItemCard from "./ItemCard";
import { useState } from "react";
import ItemDetailsPanel from "./ItemDetailsPanel";
import { useItems } from "../../context/ItemsContext";

export default function ItemCardsGrid({ filterType }) {
  const { filteredItems, updateItem, deleteItem } = useItems();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const displayedItems = filterType
    ? filteredItems.filter((i) => i.type === filterType)
    : filteredItems;

  const toggleSelect = (id, checked) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (checked) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const bulkDelete = async () => {
    for (let id of selectedIds) {
      await deleteItem(id);
    }
    clearSelection();
  };

  return (
    <>
      {/* Bulk actions toolbar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between mb-4 p-3 bg-zinc-800 rounded-2xl border border-zinc-700">
          <span>{selectedIds.size} selected</span>
          <div className="flex gap-2">
            <button
              onClick={bulkDelete}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Selected
            </button>
            <button
              onClick={clearSelection}
              className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Grid of item cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {displayedItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onClick={() => setSelectedItem(item)}
            selected={selectedIds.has(item._id)}
            onSelect={toggleSelect}
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

      {displayedItems.length === 0 && (
        <p className="text-zinc-400 col-span-full mt-4">
          No items match the selected filters.
        </p>
      )}
    </>
  );
}
