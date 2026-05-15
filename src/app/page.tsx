"use client";

import { useEffect, useState } from "react";
import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import Layout from "@/components/Layout";
import BookmarkList from "@/components/BookmarkList";
import AddEditBookmarkModal from "@/components/AddEditBookmarkModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import FilterByTagModal from "@/components/FilterByTagModal";
import SearchBar from "@/components/SearchBar";
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
      <button type="button" onClick={handleAdd}>
        Add Bookmark
      </button>

      <button type="button" onClick={handleOpenFilter}>
        Filter by Tag
      </button>

      <SearchBar />
      <BookmarkList onEdit={handleEdit} onDelete={handleDelete} />
      <TagSidebar />

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
