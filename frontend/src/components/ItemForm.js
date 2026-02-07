import { useState } from "react";
import { useItems } from "../context/ItemsContext";

const ItemForm = ({ closeForm }) => {
  const { addItem } = useItems();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Project");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem({ title, description, type, priority });
    closeForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-900/50"
    >
      <div className="mb-2">
        <input
          className="input w-full"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          className="input w-full h-20"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mb-2">
        <select
          className="input flex-1"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option>Project</option>
          <option>Subject</option>
          <option>Placement</option>
          <option>Task</option>
        </select>

        <select
          className="input flex-1"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <button className="btn-primary w-full mt-2">Add Item</button>
    </form>
  );
};

export default ItemForm;
