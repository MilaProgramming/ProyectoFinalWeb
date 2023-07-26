import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate} from 'react-router-dom';

const Inicio = () => {
  const { userEmail, setUserEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setUserEmail(''); // Limpiamos el correo almacenado en el estado global
    navigate('/');
  };

  return (
    <div>
      <h1>Bienvenido a la Página de Inicio</h1>
      <p>¡Hola! Esta es una página de inicio sencilla.</p>
      {userEmail && <p>Correo ingresado: {userEmail}</p>}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Inicio;

