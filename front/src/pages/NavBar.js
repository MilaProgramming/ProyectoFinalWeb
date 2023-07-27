


//import YourLogo from 'https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png'; // Importa tu logo aquí
import React, { useState, useEffect, useContext }  from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button,Box, Avatar } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
//import YourLogo from './path/to/your/logo.png'; // Import your logo here

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsFixed(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //para manejara logout
  const { userEmail, setUserEmail,setUserName,SetUserApellido,userName,userApellido } = useContext(AuthContext);

  const handleLogout = () => {
    setUserEmail('');
    navigate('/');
    // Lógica para cerrar sesión...
  };
  const navigate = useNavigate();
  return (
    <AppBar position="static"sx={{ backgroundColor: isFixed ? '#006400' : '#003200',display: 'flex' }}>
      
      <Toolbar>
      <Avatar 
          alt="Remy Sharp" 
          src="https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png" 
          sx={{ width: 50, height: 50,margin:1 }}/>
        <Typography variant="h6" sx={{ flexGrow: 2 }}>
          Bienvenido: {userName} {userApellido}
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button color="inherit">Datos personales</Button>
          <Button color="inherit">Servicios</Button>
          <Button color="inherit">Acerca</Button>
          <Button color="inherit"onClick={handleLogout}>Cerrar Sesión</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
  
};

export default Navbar;


/**/
/*return (
  <Box sx={{flexGrow:1}}>
  <AppBar position='static' sx={{ backgroundColor: isFixed ? '#1976d2' : '#006400' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div sx={{ display: 'flex', alignItems: 'center' }}>
        { Importa tu logo aquí }
        <img src='https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png' alt="Logo" style={{ marginRight: '8px', width: '40px', height: '40px' }} />
        <Typography variant="h6" component="span"sx={{flexGrow:1}}>
          DOCENTES UFA ESPE
        </Typography>
      </div>
      <ul sx={{ listStyle: 'none', padding: 0, display: 'flex', alignItems: 'center' ,flexGrow:1 }}>
        <li>
          <a href="#" sx={{ color: 'white', textDecoration: 'none', margin: '0 16px' }}>
            Curriculum Vitae
          </a>
        </li>
        <li>
          <a href="#" sx={{ color: 'white', textDecoration: 'none', margin: '0 16px' ,flexGrow:1}}>
            Actualizar Datos
          </a>
        </li>
        <li>
        <Button color="inherit">Inicio</Button>
      <Button color="inherit">Servicios</Button>
      <Button color="inherit">Acerca de</Button>
      <Button color="inherit">Contacto</Button>
          <Button onClick={handleLogout} color="inherit" sx={{ margin: '0 16px' }}>
            Cerrar Sesión
          </Button>
        </li>
      </ul>
    </Toolbar>
  </AppBar>
  </Box>
);*/