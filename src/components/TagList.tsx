"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

export default function TagList() {
  const { allTags, selectedTags, filterByTag, clearFilters } = useBookmarks();

  return (
    <>
      {allTags.map((tag) => (
        <button type="button" key={tag} onClick={() => filterByTag(tag)}>
          {selectedTags.includes(tag) ? "✓ " : ""}
          {tag}
        </button>
      ))}

      <button type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </>
  );
}
