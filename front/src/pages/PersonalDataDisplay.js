import React, { useState, useLayoutEffect, useContext } from 'react';
import { Typography, Container, TextField, Button, Box,Grid,Card, CardMedia, CardContent, CardActions,Avatar } from '@mui/material';
import styled from '@emotion/styled';
import Navbar from './NavBar';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';



const PersonalDataDisplay = ({ name, email, phoneNumber, photoUrl }) => {
  const { userEmail, setUserEmail,setUserName,SetUserApellido,userName,userApellido } = useContext(AuthContext);
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(()=> {
    const id_docente=userEmail;
    console.log(id_docente);
    axios.get(`http://localhost:8000/docente/${id_docente}`).then((response) => {
      setDocentes(response.data);
      console.log(response.data);
      setIsLoading(false);
    });
    
  }, []);

  return (
    <Box sx={{backgroundColor:"#bdecb6"}}>
      
      <Navbar></Navbar>
      
      <Container sx={{backgroundColor:"white"}}>
        <Box sx={{textAlign:"center"}}>
        <Typography variant="h3" sx={{ flexGrow: 2 ,backgroundColor:"white"}}>
          Datos personales
        </Typography>

        </Box>
      
      <Grid container sx={{boxShadow:2, mt:2, padding:0,backgroundColor:"white"}} width="100%" >
        
        <Grid item xs={12} sx={{ boxShadow:2,mt:1, padding:2}}  >
          <Box display="flex"
      justifyContent="center"
      alignItems="center"
      height={200}>
          <Avatar 
          alt="Remy Sharp" 
          src="https://img.freepik.com/foto-gratis/joven-confiado_1098-20868.jpg" 
          sx={{ width: 200, height: 200 }}/>

          </Box>
        

        </Grid>
      
      
        
        <Grid item 
      xs={12} 
      sm={6} 
      maxWidth="sm" 
      width="100%" 
      sx={{boxShadow:6, mt:2}} 
      display="flex" 
      flexWrap="wrap" 
      justifyContent="space-between">
        <Card sx={{margin:2, width:"100%"}} width="100%">
          <CardContent>
          {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div>
          <Typography variant='h7' fontWeight="bold">Id:</Typography>
            <Typography>{docentes[0].id_docente}</Typography>
            <Typography variant='h7' fontWeight="bold">Nombre:</Typography>
            <Typography>{docentes[0].nombre}</Typography>
            <Typography variant='h7' fontWeight="bold">Apellido</Typography>
            <Typography>{docentes[0].apellido}</Typography>
            <Typography variant='h7' fontWeight="bold">Tipo de documento:</Typography>
            <Typography>{docentes[0].tipo_documento}</Typography>
            <Typography variant='h7' fontWeight="bold">Número de documento:</Typography>
            <Typography>{docentes[0].numero_documento}</Typography>
        </div>
      )}

          </CardContent>
        </Card>
      
     
      </Grid>
      <Grid item 
      xs={12} 
      sm={6} 
      maxWidth="sm" 
      width="100%" 
      sx={{boxShadow:6, mt:2}} 
      display="flex" 
      flexWrap="wrap" 
      justifyContent="space-between">
        <Card sx={{margin:2, width:"100%"}} width="100%">
          <CardContent>

          {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div>
          <Typography variant='h7' fontWeight="bold">Ciudad de Residencia:</Typography>
            <Typography>{docentes[0].ciudad_residencia}</Typography>
            <Typography variant='h7' fontWeight="bold">Dirección</Typography>
            <Typography>{docentes[0].direccion}</Typography>
            <Typography variant='h7' fontWeight="bold">Correo electrónico:</Typography>
            <Typography>{docentes[0].correo_electronico}</Typography>
            <Typography variant='h7' fontWeight="bold">Número de teléfono</Typography>
            <Typography>{docentes[0].numero_telefono}</Typography>
            <Typography variant='h7' fontWeight="bold">Fecha de nacimiento:</Typography>
            <Typography>{docentes[0].fecha_nacimiento.substring(0,10)}</Typography>
        </div>
      )}
          </CardContent>
        </Card>
      
     
      </Grid>
    </Grid>
   
    </Container>

    </Box>

    
  );
};


export default PersonalDataDisplay;