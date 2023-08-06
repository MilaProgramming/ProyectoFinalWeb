import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

import axios from 'axios';
import { Grid } from '@mui/material';
const imagenes = require.context('../../../backend_API/src/images', true);

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

    formContainer: {
        flex: 1,
        padding: '1rem 2rem',
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



const ContactoEmergencia = ({ user, countries, roles, tipo_doc }) => {
    const classes = useStyles();

  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [body, setBody] = useState({ nombres: '', apellidos: '', tipo_documento: '', numero_documento:'', parentesco:'',provincia:'', canton:'',parroquia:'', calle_principal:'', numero_casa:'',numero_referencia:'', telefono_domicilio:'', telefono_celular:'' });


  useLayoutEffect(()=> {
    
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/contactos_emergencia/${id_docente}`).then((response) => {
      setContactos(response.data);
      setIsLoading(false);

      
    });
    
  }, []);

  const actualizarContacto = (id_contacto) => {

    axios.put(`http://localhost:8000/contacto_emergencia/${id_contacto}`, body);
    
  };
  const insertarContacto =() =>{  
    if(body.nombres === '' || body.apellidos=== '' || body.tipo_documento=== ''|| body.numero_documento === '' ||body.parentesco===''||body.provincia===''||body.canton===''|| body.parroquia === ''||body.calle_principal===''||body.numero_casa===''||body.numero_referencia===''||body.telefono_domicilio===''||body.telefono_celular===''){
      alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/contactos_emergencia/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarContacto =(id_contacto) => {
    axios.delete(`http://localhost:8000/contacto_emergencia/${id_contacto}`)
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
        {contactos.map((contacto) => {
            return (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }} >
                <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
                    <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                        <ContactEmergencyIcon fontSize="large" style={{ color: 'white', background: "red", borderRadius: '10%', width: "5%", height: "auto" }} />
                    </Grid>
                    <Grid item xs={6} sx={{ padding: 1, textAlign: 'center' }}  >
                        <TextField
                            name='nombres'
                            label="Nombres"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.nombres}
                            onChange={inputChange}
                            style={{ width: '90%' }} />
                        <TextField
                            name='apellidos'
                            label="Apeliidos"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.apellidos}
                            onChange={inputChange}
                            style={{ width: '90%' }} />

                        <TextField
                            name='telefono_domicilio'
                            label="Teléfono de domicilio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.telefono_domicilio}
                            onChange={inputChange}
                            style={{ width: '90%' }} />
                        <TextField
                            name='telefono_celular'
                            label="Teléfono celular"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.telefono_celular}
                            onChange={inputChange}
                            style={{ width: '90%' }} />
                        <TextField
                            name='numero_referencia'
                            label="Referencia del domicilio"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.numero_referencia}
                            onChange={inputChange}
                            style={{ width: '90%' }} />
                            <TextField
                            name='calle_principal'
                            label="Calle Principal"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.calle_principal}
                            onChange={inputChange}
                            style={{ width: '90%' }} />
                            <TextField
                            name='parroquia'
                            label="Parroquia"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.parroquia}
                            onChange={inputChange}
            style={{ width: '90%' }} />



                    </Grid>
                    <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                        <Box sx={{ width: '90%', marginBottom: 2 }}>
                            <Typography variant="subtitle1">Tipo de documento:</Typography>
                            <Autocomplete
                                options={['Cédula', "Pasaporte", "RUC"]}
                                name='tipo_documento'
                                defaultValue={contacto.tipo_documento}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'tipo_documento', value } })}
                            />
                            <TextField
                                name='numero_documento'
                                label="Número de documento"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={contacto.numero_documento}
                                onChange={inputChange}
                                style={{ width: '90%' }} />

                            <Typography variant="subtitle1">Parentesco:</Typography>
                            <Autocomplete
                                options={['Padre', 'Madre', "Cónyugue", "Hijo", "Otros"

                                ]}
                                name='parentesco'
                                defaultValue={contacto.parentesco}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'parentesco', value } })}
                            />



                            <Typography variant="subtitle1">Provincia:</Typography>
                            <Autocomplete
                                options={['Azuay', 'Bolivar', 'Cañar', 'Carchi', 'Chimborazo',
                                    'Cotopaxi', 'El Oro', 'Esmeraldas',
                                    'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos',
                                    'Manabí', 'Morona Santiago',
                                    'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
                                    'Santo Domingo de los Tsáchilas', 'Sucumbios', 'Tungurahua', 'Zamora Chinchipe'

                                ]}
                                name='provincia'
                                defaultValue={contacto.provincia}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'provincia', value } })}
                            />

                        </Box>
                        <TextField
                            name='canton'
                            label="Cantón"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.canton}
                            onChange={inputChange}
                            style={{ width: '90%' }} />
                            <TextField
                            name='numero_casa'
                            label="Número de casa"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            defaultValue={contacto.numero_casa}
                            onChange={inputChange}
                            style={{ width: '90%' }} />




                    </Grid>

                    <Box
        display="flex"
        marginBottom={'15px'}
        >
        <Button variant="contained" color="success" onClick={() => { asignarDatos(contacto);actualizarContacto(contacto.id_contacto)}}>Actualizar</Button>
        
        <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarContacto(contacto.id_contacto);window.location.reload();}}>Eliminar</Button>
        </Box>
                </Grid>
            </div>
            )})}

<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{padding:'15px'}}
        >
        <Button variant="contained" color="success" onClick={() => {{setFormularioVisible(true)}}}>Agregar información</Button>
        </Box>
        {formularioVisible && (
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }} >
          <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
              <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                  <ContactEmergencyIcon fontSize="large" style={{ color: 'white', background: "red", borderRadius: '10%', width: "5%", height: "auto" }} />
              </Grid>
              <Grid item xs={6} sx={{ padding: 1, textAlign: 'center' }}  >
                  <TextField
                      name='nombres'
                      label="Nombres"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />
                  <TextField
                      name='apellidos'
                      label="Apeliidos"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />

                  <TextField
                      name='telefono_domicilio'
                      label="Teléfono de domicilio"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />
                  <TextField
                      name='telefono_celular'
                      label="Teléfono celular"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />
                  <TextField
                      name='numero_referencia'
                      label="Referencia del domicilio"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />
                      <TextField
                      name='calle_principal'
                      label="Calle Principal"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />
                      <TextField
                      name='parroquia'
                      label="Parroquia"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
      style={{ width: '90%' }} />



              </Grid>
              <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                  <Box sx={{ width: '90%', marginBottom: 2 }}>
                      <Typography variant="subtitle1">Tipo de documento:</Typography>
                      <Autocomplete
                          options={['Cédula', "Pasaporte", "RUC"]}
                          name='tipo_documento'
                          margin="auto"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'tipo_documento', value } })}
                      />
                      <TextField
                          name='numero_documento'
                          label="Número de documento"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          onChange={inputChange}
                          style={{ width: '90%' }} />

                      <Typography variant="subtitle1">Parentesco:</Typography>
                      <Autocomplete
                          options={['Padre', 'Madre', "Cónyugue", "Hijo", "Otros"

                          ]}
                          name='parentesco'
                          margin="auto"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'parentesco', value } })}
                      />



                      <Typography variant="subtitle1">Provincia:</Typography>
                      <Autocomplete
                          options={['Azuay', 'Bolivar', 'Cañar', 'Carchi', 'Chimborazo',
                              'Cotopaxi', 'El Oro', 'Esmeraldas',
                              'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos',
                              'Manabí', 'Morona Santiago',
                              'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
                              'Santo Domingo de los Tsáchilas', 'Sucumbios', 'Tungurahua', 'Zamora Chinchipe'

                          ]}
                          name='provincia'
                          margin="auto"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'provincia', value } })}
                      />

                  </Box>
                  <TextField
                      name='canton'
                      label="Cantón"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />
                      <TextField
                      name='numero_casa'
                      label="Número de casa"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={inputChange}
                      style={{ width: '90%' }} />




              </Grid>

              <Box
  display="flex"
  marginBottom={'15px'}
  >
  <Button variant="contained" color="success" onClick={() => { insertarContacto()}}>Agregar</Button>
  
  </Box>
          </Grid>
      </div>

        )}

          </div>
        


      )}
    </div >

  );
};
export default ContactoEmergencia;