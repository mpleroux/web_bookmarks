"use client";

import { useEffect } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import Layout from "@/components/Layout";
import BookmarkList from "@/components/BookmarkList";

export default function Home() {
  const { fetchBookmarks } = useBookmarks();

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <Layout>
      <BookmarkList />
    </Layout>
  );
}
