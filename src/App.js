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
      <header className="App-header">Recycle Me</header>
<<<<<<< HEAD
      <CustomWebcam onSearch={handleSearchQuery}/>
=======
      <img src={Recycle} alt="Recycling Symbol" className="spinning-logo" style={{position: 'absolute',
        top: '25px',
        left: '25px',
        width: '100px',
        height: '100px'
      }}/>
      <CustomWebcam />
>>>>>>> 1d3d39683c641500e26287a0019dacc47256bc16
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearchQuery} />
      <Result query={searchedQuery} />

    </div>
  );
}

export default App;