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
    <header className="mb-6 flex items-center justify-between gap-3 xs:justify-normal">
      <h1 className="mb-0 shrink-0 text-lg">Web Bookmarks</h1>
      <div className="hidden shrink grow basis-0 xs:block">
        <SearchBar />
      </div>
      <div className="flex gap-3">
        {user && (
          <button type="button" onClick={onAdd}>
            + Add
          </button>
        )}
        {user ? (
          <button type="button" onClick={handleSignOut}>
            Sign Out
            <span className="hidden pl-1 sm:inline">
              ({user.email?.split("@")[0]})
            </span>
          </button>
        ) : (
          <button type="button" onClick={() => router.push("/login")}>
            Sign In
          </button>
        )}
        <div className="hidden xs:block">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
