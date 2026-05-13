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
      <body className="min-h-screen antialiased">
        <main className="container mx-auto px-4 py-8">
          <ThemeProvider>
            <BookmarksProvider>{children}</BookmarksProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
