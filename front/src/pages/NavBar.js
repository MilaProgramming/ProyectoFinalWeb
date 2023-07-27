


//import YourLogo from 'https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png'; // Importa tu logo aquí
import React, { useState, useEffect, useContext }  from 'react';
import { AppBar, Toolbar, Typography, Button,Box, Avatar } from '@mui/material';
import { useNavigate} from 'react-router-dom';
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
  const { setUserEmail,userName,userApellido } = useContext(AuthContext);

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