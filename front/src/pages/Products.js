import React from 'react';
import '../styles/products.css'; // Import the CSS file for styling
import NavBar from '../components/NavBar';

const Products = () => {
  return (
    <div className="flower-page">
        <NavBar/>
      <h1 className="title">Flores en venta</h1>
      <div className="flower-grid">
        {/* Flower items */}
        <div className="flower-item">
          <img src= {require("../assets/rosas.png")} alt="Flower 1" className="flower-image" />
          <p className="flower-price">$9.99</p>
        </div>
        <div className="flower-item">
          <img src={require("../assets/girasoles.jpg")} alt="Flower 2" className="flower-image" />
          <p className="flower-price">$12.99</p>
        </div>
        <div className="flower-item">
          <img src={require("../assets/tulipanes.png")} alt="Flower 3" className="flower-image" />
          <p className="flower-price">$7.99</p>
        </div>
        {/* Add more flower items */}
      </div>
    </div>
  );
};

export default Products;
