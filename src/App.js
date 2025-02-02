import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.js';
import Result from './components/Result.js';

import CustomWebcam from './webcam';

function App() {
  const [searchedQuery, setSearchedQuery] = useState('');
  const [query, setQuery] = useState('');

  const handleSearchQuery = (query) => {
    setSearchedQuery(query);
  };

  return (
    <div className="App">
      <header className="App-header">Recycle Me</header>
      <CustomWebcam />
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearchQuery} />
      <Result query={searchedQuery} />

    </div>
  );
}

export default App;