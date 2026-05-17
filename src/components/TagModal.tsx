"use client";

import { useBookmarks } from "@/hooks/useBookmarks";
import Modal from "./Modal";

export default function TagModal({ onClose }: { onClose: () => void }) {
  const { allTags, selectedTags, filterByTag, clearFilters } = useBookmarks();

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg">Tags</h2>

      <div className="mb-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => filterByTag(tag)}
            className={`tag-pill m-1 ${selectedTags.includes(tag) ? "tag-pill-active" : ""}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
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
