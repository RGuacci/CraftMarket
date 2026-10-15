import { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) return;

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="search"
        placeholder="Cerca un prodotto..."
        className="input input-bordered w-full"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button
        type="submit"
        className="btn btn-primary"
        aria-label="Cerca prodotti"
        disabled={!search.trim()}
      >
        <FaSearch />
      </button>
    </form>
  );
}
