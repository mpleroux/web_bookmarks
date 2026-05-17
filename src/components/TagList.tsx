"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

export default function TagList() {
  const { allTags, selectedTags, filterByTag, clearFilters } = useBookmarks();

  return (
    <>
      <h2 className="text-sm">Tags</h2>

      {allTags.map((tag) => (
        <button
          type="button"
          key={tag}
          onClick={() => filterByTag(tag)}
          className={`tag-pill md:my-2 md:block ${selectedTags.includes(tag) ? "tag-pill-active" : ""}`}>
          {tag}
        </button>
      ))}

      {selectedTags.length > 0 && (
        <button type="button" onClick={clearFilters} className="mb-2">
          Clear Filters
        </button>
      )}
    </>
  );
}
