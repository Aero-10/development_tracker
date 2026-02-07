import { useEffect, useState } from "react";
import ItemDetailsContent from "./ItemDetailsContent";

export default function ItemDetailsPanel({ item, onClose, onItemUpdated }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (item) {
      // allow initial render, then animate in
      requestAnimationFrame(() => setVisible(true));
    }
  }, [item]);
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200); // match transition duration
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!item) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`
          fixed inset-0 z-40 bg-black/50
          transition-opacity duration-200
          ${visible ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Panel */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-full w-full sm:w-[420px]
          bg-zinc-950 border-l border-zinc-800 p-6
          transform transition-transform duration-200 ease-out
          ${visible ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <ItemDetailsContent
          item={item}
          onClose={handleClose}
          onItemUpdated={onItemUpdated}
        />
      </div>
    </>
  );
}
