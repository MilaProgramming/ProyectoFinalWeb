import React from 'react'
import "../styles/login.css"
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


export default function Login() {

  const [user, setUser] = useState(null);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("login-button").hidden = true;
    document.getElementById("formulario").hidden = true;
  }

  function handleSignOut(event) {
    setUser(null);
    document.getElementById("login-button").hidden = false;
    document.getElementById("formulario").hidden = false;
  }


  useEffect(() => {
    /* global google */
    
    google.accounts.id.initialize({
      client_id: "197229590937-ek7dlob9vpk9ftprnsh6shi21m4kkuim.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("login-button"),
      {theme: "outline", size: "large", text: "continue_with", width: "320px", height: "4rem"}
    );

  }, [])

  return (
    <section className='login'>
      <div className="form-box">
        <div className="form-value">
          <form action="" id='formulario'>
            <h2>Login</h2>


            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="text" required />
              <label htmlFor="">Email</label>
            </div>

            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required />
              <label htmlFor="">Contraseña</label>
            </div>
           
            <button>Log in</button>


          </form>

        <div id='login-button'>

        </div>

        {
          user &&
          <div className='avance'>
            <p>Has iniciado  sesión como: </p>
            <div className='inicio'>
              <img src={user.picture} alt="user" />
              <h3>{user.name}</h3>

              <button onClick={(e) => handleSignOut(e)}>
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
              <span>Cerrar sesion</span>
              </button>

              <button >
                  <a href='\homePage'>Continuar</a>
              </button>
              </div>
          </div> 
        }


        </div>
      </div>
    </section>
  )
}
