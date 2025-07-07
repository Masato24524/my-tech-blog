import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div id="search-container" className="flex w-auto h-8 mb-4 ">
      <button
        id="search-icon"
        className="w-10 bg-white shadow-md border-gray-700 mr-2"
      >
        <SearchIcon />
      </button>

      <input
        type="text"
        placeholder="サイト内検索"
        className="w-full shadow-md"
      />
    </div>
  );
};

export default Search;
