"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Bookmark } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import Modal from "./Modal";

interface AddEditBookmarkModalProps {
  bookmark?: Bookmark;
  onClose: () => void;
}

export default function AddEditBookmarkModal({
  bookmark,
  onClose,
}: AddEditBookmarkModalProps) {
  const { addBookmark, updateBookmark } = useBookmarks();
  const [title, setTitle] = useState(bookmark?.title ?? "");
  const [url, setUrl] = useState(bookmark?.url ?? "");
  const [tagsInput, setTagsInput] = useState(bookmark?.tags.join(", ") ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!bookmark;

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError(null);

    // Parse comma-separated tags into an array, trimming whitespace
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Process form submission, either add or edit
    try {
      setIsSubmitting(true);
      if (isEditMode) {
        await updateBookmark(bookmark.id, title, url, tags);
      } else {
        await addBookmark(title, url, tags);
      }
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>{isEditMode ? "Edit Bookmark" : "Add Bookmark"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="url">URL</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <div>
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
