import type { Bookmark } from "@/types";

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
  return (
    <div>
      <p>Title: {bookmark.title}</p>
      <p>URL: {bookmark.url}</p>
      <p>
        Tags:
        {bookmark.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </p>

      <button type="button" onClick={() => onEdit(bookmark)}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(bookmark)}>
        Delete
      </button>
    </div>
  );
}
