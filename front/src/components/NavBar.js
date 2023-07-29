import React  from 'react';
//import { useState, useEffect, useContext } from 'react';
import { Toolbar, Button,Box, Avatar } from '@mui/material';
import { useNavigate} from 'react-router-dom';
//import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  // const [isFixed, setIsFixed] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const isScrolled = window.scrollY > 0;
  //     setIsFixed(isScrolled);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  // //para manejara logout
  // const { setUserEmail,userName,userApellido } = useContext(AuthContext);

  // const handleLogout = () => {
  //   setUserEmail('');
  //   navigate('/');
  //   // Lógica para cerrar sesión...
  // };
  const handleLogout = () => {
       localStorage.setItem("id_docente","");
       navigate('/');
       // Lógica para cerrar sesión...
     };
  //const navigate = useNavigate();
  return (
      
      <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: 95,
                margin: 0,
                padding: 0,
                backgroundColor: '#19501D',
      }}>
      <Avatar 
          alt="Remy Sharp" 
          src="https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png" 
          sx={{ width: 60, height: 60,margin:1 }}/>

        <Box sx={{ display: 'flex', 
        gap: '20px',
        marginRight: '4rem',
        }}>
          <Button color="inherit" sx={{fontFamily: 'poppins, sans-serif', color: 'white'}}>Acerca De</Button>
          <Button color="inherit" sx={{fontFamily: 'poppins, sans-serif', color: 'white'}} onClick={handleLogout}>Cerrar Sesión</Button>
        </Box>
      </Toolbar>

  );
  
};

export default Navbar;