// Bookmark type matching Supabase schema
export interface Bookmark {
  id: string; // UUID
  user_id: string; // UUID
  title: string;
  url: string;
  tags: string[];
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// BookmarksContext type
export interface BookmarksContextType {
  bookmarks: Bookmark[];
  allTags: string[];
  selectedTags: string[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  fetchBookmarks: () => Promise<void>;
  addBookmark: (title: string, url: string, tags: string[]) => Promise<void>;
  updateBookmark: (
    id: string,
    title: string,
    url: string,
    tags: string[],
  ) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  filterByTag: (tag: string) => void;
  clearFilters: () => void;
  search: (query: string) => void;
  getFilteredBookmarks: () => Bookmark[];
}

// ThemeContext type
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
