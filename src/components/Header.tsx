import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onAdd: () => void;
}

export default function Header({ onAdd }: HeaderProps) {
  return (
    <header className="mb-6 flex items-center gap-4">
      <h1 className="mb-0 shrink-0 text-lg">Web Bookmarks</h1>
      <div className="shrink grow basis-0">
        <SearchBar />
      </div>
      <button type="button" onClick={onAdd}>
        + Add
      </button>
      <ThemeToggle />
    </header>
  );
}
