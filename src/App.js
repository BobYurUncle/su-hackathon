import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.js';
import Result from './components/Result.js';

function App() {
  const [searchedQuery, setSearchedQuery] = useState('');

  const handleSearchQuery = (query) => {
    setSearchedQuery(query);
  };

  return (
    <div className="App">
      <header className="App-header">Recycle Me</header>
      <SearchBar onSearch={handleSearchQuery}/>
      <Result query={searchedQuery}/>
    </div>
  );
}

export default App;
