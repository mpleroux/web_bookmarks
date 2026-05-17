"use client";

import { useBookmarks } from "@/hooks/useBookmarks";
import Modal from "./Modal";

export default function TagModal({ onClose }: { onClose: () => void }) {
  const { allTags, selectedTags, filterByTag, clearFilters } = useBookmarks();

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => filterByTag(tag)}
            className={`tag-pill ${selectedTags.includes(tag) ? "tag-pill-active" : ""}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="flex gap-2 border-t p-4">
        {selectedTags.length > 0 && (
          <button type="button" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
