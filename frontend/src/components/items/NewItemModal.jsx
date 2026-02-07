import { useState, useEffect, forwardRef } from "react";
import { useItems } from "../../context/ItemsContext";

const TYPES = ["Project", "Subject", "Placement", "Task"];
const STATUS = ["Not Started", "In Progress", "Completed"];
const PRIORITY = ["Low", "Medium", "High"];

const NewItemModal = forwardRef(({ onClose }, ref) => {
  const { addItem } = useItems();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: TYPES[0],
    status: STATUS[0],
    priority: PRIORITY[0],
    notes: "",
  });

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(form);
    onClose();
  };

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-zinc-900 rounded-2xl p-6 w-[400px] border border-zinc-800 shadow-xl transform transition-transform duration-200 animate-scaleUp">
        <h2 className="text-lg font-semibold mb-4">Create New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none"
          />
          <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white">
            {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="priority" value={form.priority} onChange={handleChange} className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white">
            {PRIORITY.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            rows={2}
            className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none"
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default NewItemModal;
