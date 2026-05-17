import type { Metadata } from "next";
import { BookmarksProvider } from "@/hooks/useBookmarks";
import { ThemeProvider } from "@/hooks/useTheme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Bookmarks",
  description: "Personal bookmarking app inspired by Pinboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen min-w-xs antialiased">
        <ThemeProvider>
          <BookmarksProvider>
            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
              <main>{children}</main>
              <footer></footer>
            </div>
          </BookmarksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
