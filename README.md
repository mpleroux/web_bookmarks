# README

A website bookmarking site modeled on Pinboard.in using React and Next.js. Work-in-progress.

## Features

- Save bookmarks with title, URL, and tags
- Organize with tag-based filtering
- Light/dark mode support
- Responsive design (desktop sidebar, mobile modal)
- Cloud-based persistence with Supabase

## Tech Stack

- React
- Next.js (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL + Auth)

## Improvements

## Run locally

```sh
npm install
npm run dev # http://localhost:3000
```

## Architecture

```mermaid
graph TD
    RootLayout["RootLayout<br/>(ThemeProvider, AuthProvider,<br/>BookmarksProvider)"]
    LoginPage["LoginPage<br/>(Sign In Form)"]
    HomePage["HomePage<br/>(Main Page)"]
    Header["Header<br/>(Navigation & Actions)"]
    SearchBar["SearchBar<br/>(Filter by Text)"]
    ThemeToggle["ThemeToggle<br/>(Light / Dark Mode)"]
    BookmarkList["BookmarkList<br/>(Filtered Results)"]
    BookmarkCard["BookmarkCard<br/>(Single Bookmark)"]
    TagSidebar["TagSidebar<br/>(Desktop Tag Filters)"]
    TagModal["TagModal<br/>(Mobile Tag Filters)"]
    AddEditBookmarkModal["AddEditBookmarkModal<br/>(Add / Edit Form)"]
    DeleteConfirmationModal["DeleteConfirmationModal<br/>(Confirm Delete)"]
    Modal["Modal<br/>(Reusable Overlay)"]

    RootLayout --> LoginPage
    RootLayout --> HomePage
    HomePage --> Header
    HomePage --> BookmarkList
    HomePage --> TagSidebar
    HomePage --> TagModal
    HomePage --> AddEditBookmarkModal
    HomePage --> DeleteConfirmationModal
    Header --> SearchBar
    Header --> ThemeToggle
    BookmarkList --> BookmarkCard
    AddEditBookmarkModal --> Modal
    DeleteConfirmationModal --> Modal
    TagModal --> Modal
```

## Screenshot

<img src="./public/screenshot.png" width="400" alt="Screenshot of web bookmarks">
