import React from 'react'
import NavBar from '../components/NavBar';
import "../styles/homePage.css"

export default function HomePage() {
  return (

    <div className="full-screen-image">
        <NavBar/>

        <div className="content">
      
                <h1 className="title">¡Bienvenido a nuestra tienda!</h1>
                <h3 className="title2">Descubre las mejores flores del mercado</h3>
                <p className="text">
                    Donde la belleza natural y la fragancia se unen en armonía. Nuestro objetivo es brindarle una experiencia encantadora y cautivadora al adentrarse en el mundo de las flores.
                </p>
                <button className="buy-button"><a href='\productos'>Comprar</a></button>
     
        </div>

    </div>
   
  )
}
