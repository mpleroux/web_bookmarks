"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onAdd: () => void;
}

export default function Header({ onAdd }: HeaderProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <header className="mb-6 flex items-center gap-4">
      <h1 className="mb-0 shrink-0 text-lg">Web Bookmarks</h1>
      <div className="shrink grow basis-0">
        <SearchBar />
      </div>
      {user && (
        <button type="button" onClick={onAdd}>
          + Add
        </button>
      )}
      {user ? (
        <button type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <button type="button" onClick={() => router.push("/login")}>
          Sign In
        </button>
      )}
      <ThemeToggle />
    </header>
  );
}
