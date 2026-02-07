import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import NewItemModal from "../items/NewItemModal";

const Topbar = ({ title }) => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reference for focusing the first input in the modal
  const modalRef = useRef(null);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus first input when modal opens
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const input = modalRef.current.querySelector("input[name='title']");
      input?.focus();
    }
  }, [isModalOpen]);

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 relative">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
        >
          + New Item
        </button>

        <span className="text-sm text-gray-400">{user?.email}</span>

        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
          Logout
        </button>
      </div>

      {isModalOpen && (
        <NewItemModal
          onClose={() => setIsModalOpen(false)}
          ref={modalRef} // For autofocus
        />
      )}
    </header>
  );
};

export default Topbar;
