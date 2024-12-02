// components/SearchBox.js
import React from "react";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="my-4 flex justify-center">
      <input
        type="text"
        placeholder="请输入关键词"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-[400px] p-3 border rounded-lg shadow"
      />
    </div>
  );
};

export default SearchBox;
