import { useState, useEffect } from "react";
import { useItems } from "../../context/ItemsContext";

const TYPES = ["Project", "Subject", "Placement", "Task"];
const STATUS = ["Not Started", "In Progress", "Completed"];
const PRIORITY = ["Low", "Medium", "High"];

export default function FiltersBar() {
  const { filters, setFilters } = useItems();
  const [searchText, setSearchText] = useState(filters.search);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchText }));
    }, 300); // 300ms delay

    return () => clearTimeout(handler);
  }, [searchText, setFilters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ type: "", status: "", priority: "", search: "" });
    setSearchText("");
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Type Filter */}
      <select
        value={filters.type}
        onChange={(e) => handleFilterChange("type", e.target.value)}
        className={`border text-sm rounded px-3 py-2 focus:outline-none ${
          filters.type ? "bg-blue-700 text-white" : "bg-zinc-900 text-white border-zinc-700"
        }`}
      >
        <option value="">All Types</option>
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className={`border text-sm rounded px-3 py-2 focus:outline-none ${
          filters.status ? "bg-blue-700 text-white" : "bg-zinc-900 text-white border-zinc-700"
        }`}
      >
        <option value="">All Statuses</option>
        {STATUS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={(e) => handleFilterChange("priority", e.target.value)}
        className={`border text-sm rounded px-3 py-2 focus:outline-none ${
          filters.priority ? "bg-blue-700 text-white" : "bg-zinc-900 text-white border-zinc-700"
        }`}
      >
        <option value="">All Priorities</option>
        {PRIORITY.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or notes..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border bg-zinc-900 text-white border-zinc-700 px-3 py-2 rounded text-sm flex-1 min-w-[200px] focus:outline-none"
      />

      <button
        onClick={clearFilters}
        className="ml-auto text-sm text-red-400 hover:text-red-300"
      >
        Clear Filters
      </button>
    </div>
  );
}
