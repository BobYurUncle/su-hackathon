import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.js';
import Result from './components/Result.js';
import SearchButton from './components/SearchButton.js';

function App() {
  const [searchedQuery, setSearchedQuery] = useState('');
  const [query, setQuery] = useState('');

  const handleSearchQuery = (query) => {
    setSearchedQuery(query);
  };

  return (
    <div className="App">
      <header className="App-header">Recycle Me</header>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearchQuery} />
      <SearchButton onSearch={handleSearchQuery} query={query} setQuery={setQuery}/>
      <Result query={searchedQuery} />
    </div>
  );
}

export default App;