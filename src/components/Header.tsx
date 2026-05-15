import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <h1>Web Bookmarks</h1>
      <SearchBar />
      <ThemeToggle />
    </header>
  );
}
