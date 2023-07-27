import React, {useContext } from 'react';
import { Typography, Container, Box,Grid,Card, CardContent, Avatar } from '@mui/material';
import Navbar from './NavBar';
import { AuthContext } from '../contexts/AuthContext';

const PersonalDataDisplay = ({ name, email, phoneNumber, photoUrl }) => {
  const { userEmail, userName,userApellido } = useContext(AuthContext);
  

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
          <Typography variant='h7' fontWeight="bold">Id:</Typography>
            <Typography sx={{border:1}}>{userEmail}</Typography>
            <Typography variant='h7' fontWeight="bold">Nombre:</Typography>
            <Typography>{userName}</Typography>
            <Typography variant='h7' fontWeight="bold">Apellido</Typography>
            <Typography>{userApellido}</Typography>
            <Typography variant='h7' fontWeight="bold">Tipo de documento:</Typography>
            <Typography>Cedula</Typography>
            <Typography variant='h7' fontWeight="bold">Número de documento:</Typography>
            <Typography>{userEmail}</Typography>
            
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
          <Typography variant='h7' fontWeight="bold">Ciudad de Residencia:</Typography>
            <Typography>{userName}</Typography>
            <Typography variant='h7' fontWeight="bold">Dirección</Typography>
            <Typography>{userApellido}</Typography>
            <Typography variant='h7' fontWeight="bold">Correo electrónico:</Typography>
            <Typography>Cedula</Typography>
            <Typography variant='h7' fontWeight="bold">Número de teléfono</Typography>
            <Typography>{userApellido}</Typography>
            <Typography variant='h7' fontWeight="bold">Fecha de nacimiento:</Typography>
            <Typography>Cedula</Typography>
          </CardContent>
        </Card>
      
     
      </Grid>
    </Grid>
   
    </Container>

    </Box>

    
  );
};


export default PersonalDataDisplay;
/*return (
    <div>
        <Navbar />
        <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Datos Personales
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField  variant="outlined" value={userName} disabled />
        <TextField label="Email" variant="outlined" value={email} disabled />
        <TextField label="Número de Teléfono" variant="outlined" value={phoneNumber} disabled />
        <TextField label="URL de la Fotografía" variant="outlined" value={photoUrl} disabled />
        {/* Puedes agregar más campos de datos personales aquí }
        {photoUrl && <img src={photoUrl} alt="Fotografía" style={{ width: '100%', maxWidth: '300px' }} />}
      </div>
    </Container>
    </div>
    
  );*/

