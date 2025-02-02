import React, { useEffect } from 'react';
import './Result.css';

function Result({ query }) {

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [query]);
    
    return (
      <div className="result">
        {query ? ( 
          <h2>{query}</h2>
        ) : (
          <div></div>
        )}
      </div>
    );
}

export default Result;