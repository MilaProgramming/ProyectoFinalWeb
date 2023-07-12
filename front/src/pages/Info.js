import React from 'react';
import "../styles/info.css"
import NavBar from '../components/NavBar';

const Info = () => {
  return (
    <div>
           <NavBar/>

           <div className="blog-page">
      <div className="blog-entry">
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
      </div>
    </div>

    </div>
  );
};

export default Info;
