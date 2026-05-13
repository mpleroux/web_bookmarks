import { useBookmarks } from "@/hooks/useBookmarks";
import BookmarkCard from "./BookmarkCard";

export default function BookmarkList() {
  const { getFilteredBookmarks } = useBookmarks();

  return (
    <>
      {getFilteredBookmarks().map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </>
  );
}
