"use client";

import { useEffect, useState } from "react";
import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import BookmarkList from "@/components/BookmarkList";
import AddEditBookmarkModal from "@/components/AddEditBookmarkModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import FilterByTagModal from "@/components/FilterByTagModal";
import TagSidebar from "@/components/TagSidebar";

export default function Home() {
  const { fetchBookmarks } = useBookmarks();
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
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

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
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
      <Header onAdd={handleAdd} />

      <div className="flex gap-6">
        <div className="min-w-0 shrink grow basis-0">
          <BookmarkList onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <aside className="hidden w-48 shrink-0 md:block">
          <TagSidebar />
        </aside>
      </div>

      <div className="mb-6 flex gap-3">
        <button type="button" onClick={handleOpenFilter} className="md:hidden">
          Filter by Tag
        </button>
      </div>

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

      {isFilterModalOpen && <FilterByTagModal onClose={handleCloseFilter} />}
    </Layout>
  );
}
