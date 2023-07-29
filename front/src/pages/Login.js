import React, { useState,useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import "../styles/login.css"


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserEmail,setUserName,setUserApellido } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:8000/api/login', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Inicio de sesión exitoso
        // Aquí puedes redirigir al usuario a la página de Inicio o realizar otras acciones.
        setUserEmail(email);
        localStorage.setItem('id_docente', email);
        setUserName(data.nombre);
        setUserApellido(data.apellido);
        navigate('/Inicio');
        
       // console.log(data.message);
      } else {
        // Credenciales inválidas
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  return (
    <section className='login' id='loginP'>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleLogin} id='formulario'>

            <h2>Bienvenido</h2>

            {/* Capturando el valor del correo */}
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado con el valor del input
              />
              <label htmlFor="">Usuario</label>
            </div>

            {/* Capturando el valor de la contraseña */}
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado con el valor del input
              />
              <label htmlFor="">Contraseña</label>
            </div>

            <p className='error'>{error}</p>
            <button type="submit">Ingresar</button>
          </form>
        </div>
      </div>
    </section>
  );
}