"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

export default function SearchBar() {
  const { search, searchQuery } = useBookmarks();

  return (
    <>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={(e) => search(e.target.value)}
      />
    </>
  );
}
