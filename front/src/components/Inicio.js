/*import React, { useContext } from 'react';
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
};*/
/*import React, { useState } from 'react';
import Navbar from '../pages/NavBar';

const Inicio = () => {
  const [idDocente, setIdDocente] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [genero, setGenero] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ciudadResidencia, setCiudadResidencia] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleSaveChanges = () => {
    // Aquí puedes enviar los datos a un servidor o realizar alguna acción con ellos.
    // Por ahora, solo mostraremos los datos en la consola.
    console.log('ID Docente:', idDocente);
    console.log('Tipo de documento:', tipoDocumento);
    console.log('Número de documento:', numeroDocumento);
    console.log('Género:', genero);
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Ciudad de residencia:', ciudadResidencia);
    console.log('Dirección:', direccion);
    console.log('Correo electrónico:', correoElectronico);
    console.log('Número de teléfono:', numeroTelefono);
    console.log('Fecha de nacimiento:', fechaNacimiento);
  };

  return (

    <div>
      <Navbar />
      <h2>Curriculum Vitae</h2>
      <form>
        <div>
          <label htmlFor="idDocente">ID Docente:</label>
          <input
            type="text"
            id="idDocente"
            value={idDocente}
            onChange={(e) => setIdDocente(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tipoDocumento">Tipo de documento:</label>
          <input
            type="text"
            id="tipoDocumento"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="numeroDocumento">Número de documento:</label>
          <input
            type="text"
            id="numeroDocumento"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="genero">Género:</label>
          <input
            type="text"
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ciudadResidencia">Ciudad de residencia:</label>
          <input
            type="text"
            id="ciudadResidencia"
            value={ciudadResidencia}
            onChange={(e) => setCiudadResidencia(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="correoElectronico">Correo electrónico:</label>
          <input
            type="email"
            id="correoElectronico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="numeroTelefono">Número de teléfono:</label>
          <input
            type="tel"
            id="numeroTelefono"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>
      </form>
      <button onClick={handleSaveChanges}>Guardar cambios</button>
    </div>
  );
};

export default Inicio;*/

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Button } from '@mui/material';
import Navbar from '../pages/NavBar';

const CurriculumVitae = () => {
  const [idDocente, setIdDocente] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  // ... Define el estado para el resto de los campos

  const handleSaveChanges = () => {
    // Lógica para guardar cambios...
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" gutterBottom>
          Curriculum Vitae
        </Typography>
        <form style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="idDocente">ID Docente:</label>
            <TextField
              type="text"
              id="idDocente"
              value={idDocente}
              onChange={(e) => setIdDocente(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="tipoDocumento">Tipo de documento:</label>
            <TextField
              type="text"
              id="tipoDocumento"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="numeroDocumento">Número de documento:</label>
            <TextField
              type="text"
              id="numeroDocumento"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
            />
          </div>
          {/* ... Repite el bloque de código para los demás campos del formulario */}
          <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CurriculumVitae;
