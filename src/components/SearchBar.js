import React, { useState } from 'react';
import './SearchBar.css';
import { geminiResponse } from "../ai/api-interface"

function SearchBar({onSearch}) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {

        function getResponse(query) {
          
          const ai = geminiResponse(query)
          

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