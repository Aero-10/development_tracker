import { useState, useEffect, useCallback } from "react";
import { useItems } from "../../context/ItemsContext";
import StatusPill from "./StatusPill";

export default function ItemDetailsContent({
  item,
  onClose,
  onItemUpdated,
}) {
  const { updateItem, deleteItem } = useItems();

  const [isEditing, setIsEditing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    notes: "",
  });

  
  // Reset when a new item opens
  useEffect(() => {
    setIsEditing(false);
    setShowDelete(false);
    setForm({
      title: item.title,
      description: item.description || "",
      status: item.status,
      priority: item.priority,
      notes: item.notes || "",
    });
  }, [item]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = useCallback(async () => {
    const updated = await updateItem(item._id, form);
    onItemUpdated(updated);
    setIsEditing(false);
  }, [item._id, form, updateItem, onItemUpdated]);

  const handleCancel = () => {
    setIsEditing(false);
    setForm({
      title: item.title,
      description: item.description || "",
      status: item.status,
      priority: item.priority,
      notes: item.notes || "",
    });
  };

  const handleDelete = async () => {
    await deleteItem(item._id);
    setShowDelete(false);
    onClose();
  };

  // ⌘ / Ctrl + S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        isEditing &&
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "s"
      ) {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, handleSave]);
  // 🛡️ Prevent render glitches
  if (!item) {return null;}


  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-zinc-700 text-xl font-semibold text-white focus:outline-none"
            />
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                {item.type}
              </p>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mt-4">
        {isEditing ? (
          <>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="bg-zinc-900 border border-zinc-700 text-sm rounded px-2 py-1"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="bg-zinc-900 border border-zinc-700 text-sm rounded px-2 py-1"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </>
        ) : (
          <>
            <StatusPill status={item.status} />
            <span className="text-xs text-zinc-400">
              {item.priority} priority
            </span>
          </>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 pr-1 mt-6 space-y-6">
        <div>
          <p className="text-sm text-zinc-400 mb-1">Description</p>
          {isEditing ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-sm"
            />
          ) : (
            <p className="text-sm text-zinc-200">
              {item.description || "—"}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-zinc-400 mb-1">Notes</p>
          {isEditing ? (
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-sm"
            />
          ) : (
            <p className="text-sm text-zinc-200">
              {item.notes || "—"}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          sticky bottom-0
          -mx-6
          bg-zinc-900/80 backdrop-blur
          border-t border-zinc-800
        "
      >
        <div className="px-6 pt-4 pb-6 mb-1 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
              Last updated: {new Date(item.updatedAt).toLocaleString()}
            </p>

            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="text-sm text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm bg-white text-black px-3 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-zinc-300 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDelete(true)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-zinc-900 rounded-2xl p-6 w-[360px] border border-zinc-800">
            <h3 className="text-lg font-semibold">Delete item?</h3>
            <p className="text-sm text-zinc-400 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
