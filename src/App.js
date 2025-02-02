import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar.js';
import Result from './components/Result.js';
import Recycle from './images/Recycle.png';

import CustomWebcam from './webcam';

function App() {
  const [searchedQuery, setSearchedQuery] = useState('');
  const [query, setQuery] = useState('');

  const handleSearchQuery = (query) => {
    setSearchedQuery(query);
  };

  return (
    <div className="App">

<div className="layer layer-1"></div>

      <header className="App-header"> Recycle Me </header>
      <CustomWebcam onSearch={handleSearchQuery}/>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearchQuery} />
      <Result query={searchedQuery} />
    </div>
  );
}

// <img src={Recycle} alt="Recycling Symbol" className="spinning-logo" />  
// sorry tamir

export default App;