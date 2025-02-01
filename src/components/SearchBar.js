import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({onSearch}) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        onSearch(query);
        setQuery('');
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
    </div>
  );
}

export default SearchBar;