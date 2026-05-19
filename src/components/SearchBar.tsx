"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

export default function SearchBar() {
  const { search, searchQuery } = useBookmarks();

  return (
    <input
      aria-label="Search bookmarks"
      id="search"
      type="search"
      value={searchQuery}
      placeholder="Search bookmarks..."
      onChange={(e) => search(e.target.value)}
      className="text-xs"
    />
  );
}
