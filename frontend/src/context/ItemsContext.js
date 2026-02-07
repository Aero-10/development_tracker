import { createContext, useContext, useEffect, useState, useMemo } from "react";
import * as api from "../api/items";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    priority: "",
    search: "", // search text
  });

  // Fetch all items from API
  const loadItems = async () => {
    const data = await api.fetchItems();
    setItems(data);
  };

  const addItem = async (item) => {
    const newItem = await api.createItem(item);
    setItems((prev) => [newItem, ...prev]);
  };

  const updateItem = async (id, item) => {
    const updated = await api.updateItem(id, item);
    setItems((prev) => prev.map((i) => (i._id === id ? updated : i)));
    return updated;
  };

  const deleteItem = async (id) => {
    await api.deleteItem(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Safe string check for search
  const safeString = (str) => (typeof str === "string" ? str.toLowerCase() : "");

  // Filtered items with search optimization
  const filteredItems = useMemo(() => {
    const search = safeString(filters.search);

    return items.filter((i) => {
      const matchesType = filters.type ? i.type === filters.type : true;
      const matchesStatus = filters.status ? i.status === filters.status : true;
      const matchesPriority = filters.priority ? i.priority === filters.priority : true;
      const matchesSearch =
        search.length > 0
          ? safeString(i.title).includes(search) || safeString(i.notes).includes(search)
          : true;

      return matchesType && matchesStatus && matchesPriority && matchesSearch;
    });
  }, [items, filters]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        filteredItems,
        addItem,
        updateItem,
        deleteItem,
        filters,
        setFilters,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
