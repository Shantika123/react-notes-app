function SearchBar({ setSearch }) {

  return (

    <input
      type="text"
      placeholder="Search notes..."
      className="border p-2 mb-6 w-full rounded"
      onChange={(e) => setSearch(e.target.value)}
    />

  );

}

export default SearchBar;