import React from 'react';
import './Result.css';

function Result({ query }) {
    return (
      <div className="result">
        {query ? ( 
          <h2>{query}</h2>
        ) : (
          <h2>No results to display</h2>
        )}
      </div>
    );
}

export default Result;