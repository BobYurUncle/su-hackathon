import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchedQuery(query);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      
      {/* Show the searched query when Enter is pressed */}
      {searchedQuery && (
        <div className="search-result">
          <h2>Search Results for: {searchedQuery}</h2>
        </div>
      )}
    </div>
  );
}

export default SearchBar;