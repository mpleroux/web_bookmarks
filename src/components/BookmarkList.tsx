"use client";

import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import BookmarkCard from "./BookmarkCard";

interface BookmarkListProps {
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (bookmark: Bookmark) => void;
}

export default function BookmarkList({ onEdit, onDelete }: BookmarkListProps) {
  const { isLoading, error, getFilteredBookmarks } = useBookmarks();

  if (isLoading) {
    return <p>Loading bookmarks...</p>;
  }
  if (error) {
    return <p className="text-red-600 dark:text-red-400">{error}</p>;
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
