---
name: Web Bookmarks App Project
description: Single-user bookmarking website inspired by Pinboard.in
type: project
---

## Overview

Building a personal bookmarking app with Next.js, React, TypeScript, and Tailwind CSS. Clean, minimal interface for saving and organizing web bookmarks with cloud-based persistence via Supabase.

## Features

- Store bookmarks with: title, URL, user-entered tags, last saved/edited date
- Add/edit modal with tag input (autocomplete chips)
- Delete confirmation modal
- Light/dark mode support (Tailwind dark mode)
- Search functionality (filters by title and URL)
- Tag filtering and display
- Reverse chronological list view with edit and delete buttons
- Responsive design (two-column desktop with sidebar, single-column mobile)
- **Desktop**: Permanent tag sidebar for browsing and filtering
- **Mobile**: Tag discovery via chips on bookmark cards + dedicated "Filter by tag" button for all tags in modal/sheet

## Technical Stack

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API (BookmarksContext, ThemeContext)
- **Backend/Database**: Supabase (PostgreSQL with REST API)
- **Authentication**: Supabase Auth (for user management)
- **Database Client**: Supabase JavaScript client library

## Design Inspiration

Similar to Pinboard.in - clean, minimal interface. Not cluttered or feature-heavy.

## Dark Mode Implementation

- Using Tailwind's dark mode with `dark:` classes
- Manual class toggle on root `<html>` element
- System preference detection via `prefers-color-scheme` media query
- User theme preference persisted to Supabase
- Includes toggle button for switching themes

## Project Location

`/Users/mike/Dev/web_bookmarks` - initialized via `create-next-app@latest`

## Setup Decisions

- TypeScript: enabled
- ESLint: enabled
- Tailwind CSS: enabled
- App Router: enabled (default)
- src/ directory: enabled
- Import alias: `@/*` (default)
- React Compiler: disabled (for learning purposes)
- AGENTS.md: not included

## Supabase Configuration

- **Database**: PostgreSQL (managed by Supabase)
- **Tables**:
    - `bookmarks` table with columns: id (UUID), user_id (UUID), title (text), url (text), tags (text array), created_at (timestamp), updated_at (timestamp)
    - `users` table (managed by Supabase Auth)
- **Authentication**: Supabase Auth for user login/signup
- **Environment Variables**: SUPABASE_URL and SUPABASE_ANON_KEY in .env.local
- **API**: REST API calls via Supabase client library

## Architecture Notes

- Component-based with Context for state management
- Separate contexts for bookmarks (CRUD, search, filtering) and theme
- Custom hooks: `useBookmarks`, `useTheme`, `useSupabase`
- All bookmark data fetched from Supabase on component mount
- Real-time sync capabilities available via Supabase subscriptions (future enhancement)
- Seed data: Create 5-10 sample bookmarks via Supabase dashboard or seed script for immediate testing

**Tag Display Strategy (Responsive):**

- **Desktop**: Permanent sidebar showing all available tags with filter counts
- **Mobile**:
    - Tags displayed as clickable chips on each bookmark card (for natural discovery)
    - "Filter by tag" button that opens modal/bottom sheet with all tags
    - Tapping a tag on the card or in the modal filters the bookmark list
    - Cleaner, less cluttered UI with intentional tag browsing

- Tag input in modal: autocomplete with chip UI for adding/editing
- Error handling: Network errors, auth failures, DB validation errors

## Learning Focus

You're a beginner at React/NextJS and prefer to enter all changes manually to learn. This includes understanding API calls, async/await, error handling, responsive design patterns, and how to integrate a backend service.

## Next Steps (10 Total)

1. Set up Supabase project and obtain API credentials
2. Create database schema (bookmarks table)
3. Create type definitions (Bookmark interface, Supabase types)
4. Set up Supabase client and environment variables
5. Set up contexts (Bookmarks with API calls, ThemeContext)
6. Create components (layout first, then modals, then smaller components)
7. Implement CRUD operations with Supabase API calls
8. Implement search and filtering (client-side initially)
9. Set up basic authentication (login/signup)
10. Test responsive behavior and Supabase data persistence
