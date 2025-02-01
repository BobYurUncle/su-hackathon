import React from 'react';
import './SearchButton.css';

function SearchButton({ onSearch, query, setQuery}) {
  const handleSearch = () => {
    onSearch(query);
    setQuery('');
  };

  return (
    <button onClick={handleSearch} className="search-button">
      Search
    </button>
  );
}

export default SearchButton;