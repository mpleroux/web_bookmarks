"use client";

import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import BookmarkCard from "./BookmarkCard";

interface BookmarkListProps {
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (bookmark: Bookmark) => void;
}

export default function BookmarkList({ onEdit, onDelete }: BookmarkListProps) {
  const { bookmarks, isLoading, error, getFilteredBookmarks } = useBookmarks();

  // Show a loading state only on the initial fetch; subsequent re-fetches keep existing bookmarks visible
  if (isLoading && bookmarks.length === 0) {
    return <p>Loading bookmarks...</p>;
  }
  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      {getFilteredBookmarks().map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
