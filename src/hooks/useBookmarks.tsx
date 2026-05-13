"use client";

import { useContext, createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { Bookmark, BookmarksContextType } from "@/types";
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

  // Core Actions (with Supabase Integration)
  const fetchBookmarks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Query Supabse: SELECT * FROM bookmarks ordered by newest first
    try {
      const { data, error: supabaseError } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      // Update bookmarks state with returned data
      setBookmarks(data || []);

      // Extract unique tags
      // Loop through all bookmarks, collect every tag into a Set,
      // sort alphabetically, store in allTags
      const tags = new Set<string>();

      (data || []).forEach((bookmark: Bookmark) => {
        bookmark.tags.forEach((tag: string) => {
          tags.add(tag);
        });
      });

      setAllTags(Array.from(tags).sort());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch bookmarks",
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
        const { data, error: supabaseError } = await supabase
          .from("bookmarks")
          .insert([
            {
              title,
              url,
              tags,
              user_id: "temp-user", // Will be replaced with actual user_id with authentication
            },
          ])
          .select(); // Retrieve inserted data to add to state immediately

        if (supabaseError) throw supabaseError;

        if (data && data.length > 0) {
          // Prepend new bookmark to top of bookmarks array (most recent first)
          setBookmarks((prev) => [data[0], ...prev]);

          // Add any new tags from the bookmark to allTags if they don't exist
          const newTags = new Set(allTags);
          tags.forEach((tag) => {
            newTags.add(tag);
          });
          setAllTags(Array.from(newTags).sort());
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add bookmark");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [allTags],
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

        // Recalculate all tags from updated bookmarks
        // (remove tags no longer in use, add new ones)
        const newTags = new Set<string>();
        updatedBookmarksArray.forEach((b) => {
          b.tags.forEach((tag) => {
            newTags.add(tag);
          });
        });
        setAllTags(Array.from(newTags).sort());
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update bookmark",
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
      // Delete the bookmark row from Supabase
      try {
        const { error: supabaseError } = await supabase
          .from("bookmarks")
          .delete()
          .eq("id", id);

        if (supabaseError) throw supabaseError;

        // Remove the bookmark from bookmarks state
        const bookmarksAfterDelete = bookmarks.filter((b) => b.id !== id);
        setBookmarks(bookmarksAfterDelete);

        // Recalculate tags, removing orphaned ones
        const newTags = new Set<string>();
        bookmarksAfterDelete.forEach((b) => {
          b.tags.forEach((tag) => {
            newTags.add(tag);
          });
        });
        setAllTags(Array.from(newTags).sort());
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete bookmark",
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
