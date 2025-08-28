"use client";

import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [inputSearch, setInputSearch] = useState<string>("");

  // 検索ボックスの内容を取得
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputSearch(e.target.value);
    console.log("inputSearch:", inputSearch);
  };

  const handleClickSearch = () => {
    const searchWord = inputSearch.toLocaleLowerCase().trim();
    // リダイレクト処理
    window.location.href = `/search?q=${encodeURIComponent(searchWord)}`;
  };

  return (
    <div id="search-container" className="flex w-full h-8 mb-4">
      <input
        id="search-input"
        className="w-full shadow-md mr-2"
        type="text"
        placeholder=" サイト内検索"
        value={inputSearch}
        onChange={handleInputChange}
      />

      <button
        id="search-icon"
        className="w-10 bg-white shadow-md border-gray-700"
        onClick={handleClickSearch}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
