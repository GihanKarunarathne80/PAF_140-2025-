import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value); // Real-time search
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
          placeholder={placeholder}
          value={keyword}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
