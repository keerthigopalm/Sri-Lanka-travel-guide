import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import "./SearchBar.css";

function SearchBar({ value, onChange, placeholder = "Search destinations..." }) {
  const handleClear = () => onChange("");

  return (
    <div className="search-bar">
      <FiSearch className="search-bar__icon" size={18} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
        aria-label="Search"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
