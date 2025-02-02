import React from 'react';
import './SearchBar.css';
import { geminiResponse } from "../ai/api-interface"

function SearchBar({ onSearch, query, setQuery }) {
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {

        function getResponse(query) {
          
          const ai = geminiResponse(query)
          onSearch(ai);

        }

        getResponse(query)

        
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