import type { Bookmark } from "@/types";

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
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

      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
