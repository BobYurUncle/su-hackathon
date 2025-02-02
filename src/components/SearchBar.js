import React, { useEffect, useState, useReducer } from 'react';
import './SearchBar.css';
import { geminiResponse } from "../ai/api-interface"

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false); // New state to trigger search
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // This useEffect will run when triggerSearch is true (i.e., when Enter is pressed)
  useEffect(() => {
    if (triggerSearch && query.trim() !== '') {
      async function getResponse() {
        const ai = await geminiResponse(query);
        console.log("query" + query)
        onSearch(ai);
        setQuery('');  // Set the new AI response as query
        console.log('here ' + ai);
      }
      getResponse();
      setTriggerSearch(false); // Reset the trigger after search
    }
  }, [triggerSearch, query, onSearch]);  // Dependency array ensures it reacts to changes in triggerSearch and query

  // Event handler for keydown
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      setTriggerSearch(true);  // Trigger the useEffect to run
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