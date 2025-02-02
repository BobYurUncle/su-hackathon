import React from 'react';
import './Result.css';

function Result({ query }) {
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