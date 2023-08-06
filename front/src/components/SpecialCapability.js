// UserProfileCard.js
import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import AccessibleIcon from '@mui/icons-material/Accessible';

import axios from 'axios';
import { Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontFamily: 'poppins, sans-serif',
  },
  formContainer: {
    display: 'block',
    padding: '1rem 2rem',
    marginTop: '15px',
    borderRadius: '7px',
    backgroundColor: '#EAEAEA '

  },

  avatarContainer: {
    flex: 1,
    borderRadius: '0.5rem',
    width: '400px', height: '400px',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },
}));



const SpecialCapability = () => {
  const classes = useStyles();
  const [body, setBody] = useState({ tipo_capacidad: '', porcentaje: '', numero_carnet: '' });
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [capacidades,setCapacidades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);




  useLayoutEffect(()=> {  
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/capacidades_especiales/${id_docente}`).then((response) => {
      setCapacidades(response.data);  
      setIsLoading(false);

      
    });
  }, []);

  const actualizarCapacidad = (id_capacidad) => {
    axios.put(`http://localhost:8000/capacidad_especial/${id_capacidad}`, body);
  };
  const insertarCapacidad =() =>{  
    if(body.tipo_capacidad === '' || body.porcentaje=== '' || body.numero_carnet=== ''){
      alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/capacidad_especial/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarCapacidad =(id_capacidad) => {
    axios.delete(`http://localhost:8000/capacidad_especial/${id_capacidad}`)
  }
  const inputChange = ({ target }) => {
    const { name, value } = target
    if(value === ''){
      alert('Por favor no deje campos en blanco')
    }else{
    setBody({
        ...body,
        [name]: value
    })
    }

  }
  const asignarDatos = (docente) => {
    for (const prop in docente) {
      if (body[prop] === '') {
          body[prop] = docente[prop];
        
      }
    }

  }
  return (
    <div className={classes.root} >
    {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div>
            {capacidades.map((capacidad) => {
            return (
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '10px' }} >
        <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
          <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
            <AccessibleIcon fontSize="large" style={{ color: 'white', background: "blue", borderRadius: '10%', width: "5%", height: "auto" }} />

          </Grid>
          <Grid item xs={12} sm={12} maxWidth="sm" width="90%" sx={{ padding: 1}} justifyContent="center" >
            <Box sx={{ width: '90%', margin: 'auto' }}>
              <TextField
                name='tipo_capacidad'
                label="Tipo de Capacidad Especial"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={capacidad.tipo_capacidad}
                onChange={inputChange}
                style={{ width: '100%' }} />




              <Typography variant="subtitle1">Porcentaje de Capacidad Especial:</Typography>
              <Autocomplete
                options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                name='porcentaje'
                defaultValue={capacidad.porcentaje}
                margin="normal"
                fullWidth
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => inputChange({ target: { name: 'porcentaje', value } })}
              />



              <TextField
                name='numero_carnet'
                label="Número de carnet"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={capacidad.numero_carnet}
                onChange={inputChange}
                style={{ width: '100%' }} />
                <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <Button variant="contained" color="success" onClick={() => { asignarDatos(capacidad);actualizarCapacidad(capacidad.id_capacidad);window.location.reload()}}>Actualizar</Button>
        <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarCapacidad(capacidad.id_capacidad);window.location.reload();}}>Eliminar</Button>

        </Box>
              
            </Box>



          </Grid>
    
        </Grid>
      </div>
            )})}
</div>


      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{padding:'15px'}}
        >
        <Button variant="contained" color="success" onClick={() => {{setFormularioVisible(true)}}}>Agregar informacion</Button>
        </Box>
        {formularioVisible && (
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '10px' }} >
          <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
            <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
              <AccessibleIcon fontSize="large" style={{ color: 'white', background: "blue", borderRadius: '10%', width: "5%", height: "auto" }} />
  
            </Grid>
            <Grid item xs={12} sm={12} maxWidth="sm" width="90%" sx={{ padding: 1}} justifyContent="center" >
              <Box sx={{ width: '90%', margin: 'auto' }}>
                <TextField
                  name='tipo_capacidad'
                  label="Tipo de Capacidad Especial"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={inputChange}
                  style={{ width: '100%' }} />
  
  
  
  
                <Typography variant="subtitle1">Porcentaje de Capacidad Especial:</Typography>
                <Autocomplete
                  options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                  name='porcentaje'
                  margin="normal"
                  fullWidth
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  onChange={(event, value) => inputChange({ target: { name: 'porcentaje', value } })}
                />
  
  
  
                <TextField
                  name='numero_carnet'
                  label="Número de carnet"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={inputChange}
                  style={{ width: '100%' }} />
                  <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          >
          <Button variant="contained" color="success" onClick={() => { insertarCapacidad()}}>Agregar</Button>
          </Box>
                
              </Box>
  
  
  
            </Grid>
      
          </Grid>
        </div>

        )}
    </div >
      

  );
};

export default SpecialCapability;