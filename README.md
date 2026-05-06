# README

## Features

- Save bookmarks with title, URL, and tags
- Organize with tag-based filtering
- Light/dark mode support
- Responsive design (desktop sidebar, mobile modal)
- Cloud-based persistence with Supabase

## Tech Stack

- React
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL + Auth)

## Improvements

## Run locally

```sh
npm install
npm run dev # http://localhost:3000

## Screenshot

## Notes

```sh
cd ~/Dev
npx create-next-app@latest web_bookmarks
```

```txt
✔ Would you like to use the recommended Next.js defaults? › No, customize settings
✔ Would you like to use TypeScript? … No / _Yes_
✔ Which linter would you like to use? › ESLint
✔ Would you like to use React Compiler? … _No_ / Yes
✔ Would you like to use Tailwind CSS? … No / _Yes_
✔ Would you like your code inside a `src/` directory? … No / _Yes_
✔ Would you like to use App Router? (recommended) … No / _Yes_
✔ Would you like to customize the import alias (`@/*` by default)? … _No_ / Yes
✔ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? … _No_ / Yes
```

Install the VSCode [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss):

```sh
npm install -D prettier prettier-plugin-tailwindcss
```

Create `.prettierrc` at the root level of the project and use the correct path for your CSS file.

```json
{
  "bracketSameLine": true,
  "plugins": [
    "prettier-plugin-tailwindcss"
  ],
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "parser": "markdown"
      }
    }
  ],
  "tailwindStylesheet": "./src/app/globals.css"
}
```
