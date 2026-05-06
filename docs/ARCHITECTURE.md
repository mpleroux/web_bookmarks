---
name: Web Bookmarks Architecture Plan
description: Detailed component structure, state flow, and implementation sequence
type: architecture
---

## Component Structure

```
App (root)
├── Layout
│   ├── Header
│   │   ├── Title
│   │   ├── SearchBar
│   │   └── ThemeToggle
│   ├── Main Content Container
│   │   ├── TagSidebar (desktop only)
│   │   └── BookmarkListContainer
│   │       └── BookmarkList
│   │           └── BookmarkCard (with tag chips)
│   └── Footer (optional)
├── Modals
│   ├── AddEditBookmarkModal
│   ├── DeleteConfirmationModal
│   └── FilterByTagModal (mobile only)
└── Contexts (providers at App level)
    ├── BookmarksContext
    └── ThemeContext
```

## Context & State Flow

### BookmarksContext

**State:**

```typescript
{
  bookmarks: Bookmark[]         // All bookmarks from Supabase
  allTags: string[]             // Unique tags across all bookmarks
  selectedTags: string[]        // Currently filtered tags
  searchQuery: string           // Current search input
  isLoading: boolean            // Fetching/updating state
  error: string | null          // Error messages
}
```

**Actions:**

- `fetchBookmarks()` — Get all bookmarks from Supabase on mount
- `addBookmark(title, url, tags)` — Add new bookmark to Supabase
- `updateBookmark(id, title, url, tags)` — Update existing bookmark
- `deleteBookmark(id)` — Delete bookmark from Supabase
- `filterByTag(tag)` — Toggle tag filter (add/remove from selectedTags)
- `clearFilters()` — Reset selectedTags
- `search(query)` — Update searchQuery
- `getFilteredBookmarks()` — Return bookmarks filtered by tags + search (computed)

**Hook:**

```typescript
const useBookmarks = () => {
  // Return context + helper methods
  // Handles all Supabase API calls
  // Error handling and loading states
}
```

### ThemeContext

**State:**

```typescript
{
  isDarkMode: boolean
}
```

**Actions:**

- `toggleTheme()` — Switch theme and persist to Supabase

**Hook:**

```typescript
const useTheme = () => {
  // Return context + toggleTheme
  // Syncs with system preference on first load
  // Applies class to <html> element
}
```

## Supabase Integration Points

**App.tsx/Root Layout:**

- Initialize Supabase client on app startup
- Wrap app with BookmarksProvider and ThemeProvider
- Call `fetchBookmarks()` on mount

**useBookmarks Hook:**

- `fetchBookmarks()` → SELECT * FROM bookmarks WHERE user_id = current_user
- `addBookmark()` → INSERT into bookmarks
- `updateBookmark()` → UPDATE bookmarks
- `deleteBookmark()` → DELETE from bookmarks
- Include error handling and loading states

**useTheme Hook:**

- On mount: Check localStorage or Supabase for saved theme preference
- `toggleTheme()` → UPDATE users table with theme preference

**AuthContext (future):**

- Handle login/signup with Supabase Auth
- Store user_id in context
- Pass user_id to all bookmark queries

## Implementation Sequence

**Phase 1: Setup & Foundations**

1. Set up Supabase project, get API credentials
2. Create database schema (bookmarks table)
3. Create TypeScript type definitions (Bookmark, Supabase types)
4. Set up Supabase client and environment variables
5. Create custom hooks: useSupabase, useBookmarks, useTheme

**Phase 2: State Management & Contexts**
6. Build BookmarksContext and Provider
7. Build ThemeContext and Provider
8. Add seed data to Supabase for testing

**Phase 3: Core Components**
9. Create Layout component (basic structure)
10. Create Header component with SearchBar and ThemeToggle
11. Create BookmarkCard component (with tag chips visible)
12. Create BookmarkList component (pulls from context)
13. Wire up context to components, test data flow

**Phase 4: Modals & Interactions**
14. Create AddEditBookmarkModal
15. Create DeleteConfirmationModal
16. Wire modals to BookmarksContext actions
17. Test CRUD operations via modals

**Phase 5: Tag & Filter Features**
18. Implement tag filtering logic in BookmarksContext
19. Create FilterByTagModal (mobile only)
20. Create TagSidebar (desktop only)
21. Wire up tag filtering to BookmarkList

**Phase 6: Search**
22. Wire up SearchBar to BookmarksContext
23. Implement client-side filtering (title + URL)

**Phase 7: Responsive Design**
24. Test layout at breakpoints
25. Ensure mobile hides sidebar, shows FilterByTagModal
26. Ensure desktop shows sidebar
27. Test tag chips on mobile BookmarkCards

**Phase 8: Polish & Auth**
28. Add loading states and error messages
29. Test error scenarios (network failures, Supabase errors)
30. Add basic authentication (login/signup) with Supabase Auth
31. Ensure bookmarks are per-user (user_id in queries)

## Key Design Decisions

**Context API over Redux:**

- Simpler for a beginner
- Sufficient for this app's complexity
- Separate contexts for concerns (Bookmarks vs Theme)

**Fetch on App Mount:**

- All bookmarks loaded once when app starts
- Filtering happens in-memory (fast, responsive)
- Re-fetch after mutations or manual refresh

**Tag Chips on Cards (Mobile Discovery):**

- Users see tags naturally while browsing
- Can tap to filter
- No need for separate sidebar

**useBookmarks Hook Pattern:**

- Encapsulates all Supabase API calls
- Easy to test and refactor later
- Clean separation of concerns

## Testing Checklist

- [ ] Bookmarks load from Supabase on app start
- [ ] Add bookmark → appears in list immediately
- [ ] Update bookmark → reflects in list
- [ ] Delete bookmark → removed from list
- [ ] Tag filter works on desktop (sidebar)
- [ ] Tag filter works on mobile (modal + card chips)
- [ ] Search filters by title and URL
- [ ] Theme toggle persists across refresh
- [ ] Responsive layout at mobile/desktop breakpoints
- [ ] Error states displayed (network, Supabase errors)
- [ ] Loading states shown during API calls
