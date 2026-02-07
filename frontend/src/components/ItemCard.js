import { useState } from "react";
import { useItems } from "../context/ItemsContext";

const statusColors = {
  "Not Started": "bg-red-600",
  "In Progress": "bg-yellow-400",
  "Completed": "bg-green-400"
};

const ItemCard = ({ item }) => {
  const { updateItem, deleteItem } = useItems();
  const [status, setStatus] = useState(item.status);

  const handleStatusChange = async (e) => {
    setStatus(e.target.value);
    await updateItem(item._id, { status: e.target.value });
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-900/50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{item.title}</h3>
        <button
          onClick={() => deleteItem(item._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
      <p className="text-gray-300 mb-2">{item.description}</p>

      <select
        value={status}
        onChange={handleStatusChange}
        className={`input ${statusColors[status]} text-black`}
      >
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </div>
  );
};

export default ItemCard;
