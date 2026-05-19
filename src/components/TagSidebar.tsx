"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

export default function TagSidebar() {
  const { bookmarks, allTags, selectedTags, filterByTag, clearFilters } =
    useBookmarks();

  // count number of bookmarks that use each tag
  const tagCounts = bookmarks.reduce<Record<string, number>>(
    (acc, bookmark) => {
      bookmark.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
      });
      return acc;
    },
    {},
  );

  return (
    <>
      <h2 className="text-sm">Tags</h2>

      {allTags.map((tag) => (
        <button
          type="button"
          key={tag}
          onClick={() => filterByTag(tag)}
          aria-pressed={selectedTags.includes(tag)}
          className={`tag-pill md:my-2 md:block ${selectedTags.includes(tag) ? "tag-pill-active" : ""}`}>
          {tag} <span className="ml-1">({tagCounts[tag]})</span>
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
