"use client";

import { useContext, createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { Bookmark, BookmarksContextType } from "@/types";
import { supabase } from "@/utils/supabase";

const BookmarksContext = createContext<BookmarksContextType | undefined>(
  undefined,
);

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recalculateTags = (bookmarks: Bookmark[]) => {
    const tags = new Set<string>();
    bookmarks.forEach((b) => b.tags.forEach((tag) => tags.add(tag)));
    setAllTags(Array.from(tags).sort());
  };

  // Core Actions (with Supabase Integration)
  const fetchBookmarks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Query Supabase: SELECT * FROM bookmarks ordered by newest first
    try {
      const { data, error: supabaseError } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      setBookmarks(data || []);
      recalculateTags(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch bookmarks.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addBookmark = useCallback(
    async (title: string, url: string, tags: string[]) => {
      setIsLoading(true);
      setError(null);

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const { data, error: supabaseError } = await supabase
          .from("bookmarks")
          .insert([{ title, url, tags, user_id: user.id }])
          .select();

        if (supabaseError) throw supabaseError;

        if (data && data.length > 0) {
          const newBookmarks = [data[0] as Bookmark, ...bookmarks];
          setBookmarks(newBookmarks);
          recalculateTags(newBookmarks);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to add bookmark.",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [bookmarks],
  );

  const updateBookmark = useCallback(
    async (id: string, title: string, url: string, tags: string[]) => {
      setIsLoading(true);
      setError(null);

      try {
        // Update the bookmark row in Supabase with new values and current timestamp
        const { error: supabaseError } = await supabase
          .from("bookmarks")
          .update({ title, url, tags, updated_at: new Date().toISOString() })
          .eq("id", id);

        if (supabaseError) throw supabaseError;

        // Calculate updated bookmarks for tag recalculation
        const updatedBookmarksArray = bookmarks.map((b) =>
          b.id === id
            ? { ...b, title, url, tags, updated_at: new Date().toISOString() }
            : b,
        );

        setBookmarks(updatedBookmarksArray);
        recalculateTags(updatedBookmarksArray);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update bookmark.",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [bookmarks],
  );

  const deleteBookmark = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { error: supabaseError } = await supabase
          .from("bookmarks")
          .delete()
          .eq("id", id);

        if (supabaseError) throw supabaseError;

        const bookmarksAfterDelete = bookmarks.filter((b) => b.id !== id);
        setBookmarks(bookmarksAfterDelete);
        recalculateTags(bookmarksAfterDelete);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete bookmark.",
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [bookmarks],
  );

  // Filter & Search Actions
  // Toggle tag in selectedTags array
  const filterByTag = useCallback((tag: string): void => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearFilters = useCallback((): void => {
    setSelectedTags([]);
    setSearchQuery("");
  }, []);

  const search = useCallback((query: string): void => {
    setSearchQuery(query);
  }, []);

  // Computed Filtering Function
  const getFilteredBookmarks = useCallback((): Bookmark[] => {
    return bookmarks.filter((bookmark) => {
      // Tag filtering (return bookmarks with all selected tags)
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((tag) =>
          bookmark.tags.includes(tag),
        );
        if (!hasAllTags) return false;
      }

      // Search filtering (return bookmarks that match title or URL)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = bookmark.title.toLowerCase().includes(query);
        const matchesUrl = bookmark.url.toLowerCase().includes(query);
        return matchesTitle || matchesUrl;
      }

      // No filters (return everything)
      return true;
    });
  }, [bookmarks, selectedTags, searchQuery]);

  return (
    <BookmarksContext
      value={{
        bookmarks,
        allTags,
        selectedTags,
        searchQuery,
        isLoading,
        error,
        fetchBookmarks,
        addBookmark,
        updateBookmark,
        deleteBookmark,
        filterByTag,
        clearFilters,
        search,
        getFilteredBookmarks,
      }}>
      {children}
    </BookmarksContext>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within BookmarksProvider");
  }
  return context;
};
