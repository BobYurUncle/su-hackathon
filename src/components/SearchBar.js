import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import { geminiResponse } from "../ai/api-interface"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  useEffect(() => {
    if (triggerSearch && query.trim() !== '') {
      async function getResponse() {
        const ai = await geminiResponse(query);
        console.log("query" + query)
        onSearch(ai);
        setQuery('');
        console.log('here ' + ai);
      }
      getResponse();
      setTriggerSearch(false);
    }
  }, [triggerSearch, query, onSearch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      setTriggerSearch(true);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;