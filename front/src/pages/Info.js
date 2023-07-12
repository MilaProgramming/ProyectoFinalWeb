import React, { useEffect, useState } from 'react';
import "../styles/info.css"
import NavBar from '../components/NavBar';
import { SearchBar } from "../api/SearchBar";
import { SearchResultsList } from "../api/SearchResultsList";


const Info = () => {
  const [results, setResults] = useState([]);
  
  return (
    <div>
      
      <NavBar/>
      
      <div className="blog-page">

      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>

      {/* <div className="blog-entry">
        <div className="entry-image"></div>
        <div className="entry-content">
          <h2 className="entry-title">Blog Entry 1</h2>
          <p className="entry-text">
            Datos curiosos
          </p>
        </div>
      </div>
      <div className="blog-entry">
        <div className="entry-image"></div>
        <div className="entry-content">
          <h2 className="entry-title">Blog Entry 2</h2>
          <p className="entry-text">
            Datos curiosos sobre flores
          </p>
        </div>
      </div> */}
    </div>

    </div>
  );
};

export default Info;
