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

// Supabase Auth types
export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token?: string;
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
