import React from 'react'
import "../styles/login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  return (
    <section className='login'>
      <div className="form-box">
        <div className="form-value">
          <form action="">
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

            <button >
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            <span>Log in with Google</span>
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}
