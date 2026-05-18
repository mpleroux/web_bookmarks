"use client";

import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAuth } from "@/hooks/useAuth";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (bookmark: Bookmark) => void;
}

export default function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
}: BookmarkCardProps) {
  const { filterByTag, selectedTags } = useBookmarks();
  const { user } = useAuth();
  const formattedDate = new Date(bookmark.updated_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="flex items-start justify-between gap-4 border-b border-gray-200 px-3 py-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50">
      <div className="min-w-0 shrink grow basis-0">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-0.5 block w-fit text-lg leading-snug font-medium">
          {bookmark.title}
        </a>

        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 block w-fit truncate text-xs text-gray-500 dark:text-gray-400">
          {bookmark.url}
        </a>

        {bookmark.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {bookmark.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => filterByTag(tag)}
                className={`tag-pill ${selectedTags.includes(tag) ? "tag-pill-active" : ""}`}>
                {tag}
              </button>
            ))}
          </div>
        )}

        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formattedDate}
        </span>
      </div>

      {user && (
        <div className="flex shrink-0 gap-1.5 pt-0.5">
          <button type="button" onClick={() => onEdit(bookmark)}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(bookmark)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
