"use client";

import { useEffect, useState } from "react";
import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import Layout from "@/components/Layout";
import BookmarkList from "@/components/BookmarkList";
import AddEditBookmarkModal from "@/components/AddEditBookmarkModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

export default function Home() {
  const { fetchBookmarks } = useBookmarks();
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<
    Bookmark | undefined
  >(undefined);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleAdd = () => {
    setSelectedBookmark(undefined);
    setIsAddEditModalOpen(true);
  };

  const handleEdit = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    setIsAddEditModalOpen(true);
  };

  const handleDelete = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark);
    setIsDeleteModalOpen(true);
  };

  const handleCloseAddEdit = () => {
    setIsAddEditModalOpen(false);
    setSelectedBookmark(undefined);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedBookmark(undefined);
  };

  return (
    <Layout>
      <button type="button" onClick={handleAdd}>
        Add Bookmark
      </button>

      <BookmarkList onEdit={handleEdit} onDelete={handleDelete} />

      {isAddEditModalOpen && (
        <AddEditBookmarkModal
          bookmark={selectedBookmark}
          onClose={handleCloseAddEdit}
        />
      )}
      {isDeleteModalOpen && selectedBookmark && (
        <DeleteConfirmationModal
          bookmark={selectedBookmark}
          onClose={handleCloseDelete}
        />
      )}
    </Layout>
  );
}
