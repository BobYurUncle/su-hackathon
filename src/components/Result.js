import React from 'react';
import './Result.css';
import { geminiResponse } from "../ai/api-interface"

function Result({ query }) {
    return (
      <div className="result">
        {query ? ( 
          <h2>Search Results for: {query}</h2>
        ) : (
          <h2>No results to display</h2>
        )}
      </div>
    );
}

export default Result;