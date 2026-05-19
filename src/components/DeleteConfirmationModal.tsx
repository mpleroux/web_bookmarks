"use client";

import { useState } from "react";
import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import Modal from "./Modal";

interface DeleteConfirmationModalProps {
  bookmark: Bookmark;
  onClose: () => void;
}

export default function DeleteConfirmationModal({
  bookmark,
  onClose,
}: DeleteConfirmationModalProps) {
  const { deleteBookmark } = useBookmarks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    try {
      setIsDeleting(true);
      await deleteBookmark(bookmark.id);
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 id="modal-title" className="text-lg">
        Delete Bookmark
      </h2>

      <p className="text-sm">
        Are you sure you want to delete &quot;{bookmark.title}&quot;?
      </p>

      {error && <div className="error-message">{error}</div>}

      <div className="modal-footer">
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="button" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}
