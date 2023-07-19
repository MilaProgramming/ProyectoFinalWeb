import React from 'react'
import "../styles/login.css"

export default function Login() {


  return (
    <section className='login'>
      <div className="form-box">
        <div className="form-value">
          <form action="" id='formulario'>
            
            <h2>Bienvenido</h2>


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
           
            <button>Ingresar</button>


          </form>

        <div id='login-button'>

        </div>

        </div>
      </div>
    </section>
  )
}
