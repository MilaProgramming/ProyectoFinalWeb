// Publicacion.js
import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';

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
}));



const Publicacion = ({ user, countries, roles, tipo_doc }) => {
    const classes = useStyles();

  const [publicaciones, setPublicaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [body, setBody] = useState({ autores: '', publicador: '', tipo_participacion: '', idioma:'', estado_publicacion:'',numero_volumen:'', revision_pares:'', fecha:'', titulo:'',tipo:'',issn:'',impacto:'' });
  const minFechaPermitida = '2012-01-01';
  const maxFechaPermitida = '2023-07-31';
  let fechaValida=true;

  useLayoutEffect(()=> {
    
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/publicaciones/${id_docente}`).then((response) => {
      setPublicaciones(response.data);
      setIsLoading(false);

      
    });
    
  }, []);

  const actualizarPublicacion = (id_publicacion) => {
    if(fechaValida=== false){
      alert('Fecha inválida')
    }else{
    axios.put(`http://localhost:8000/publicacion/${id_publicacion}`, body);
    }
  };
  const insertarPublicacion =() =>{  
    if(body.autores === '' || body.publicador=== '' || body.tipo_participacion=== ''|| body.idioma === '' ||body.estado_publicacion===''||body.numero_volumen===''||body.revision_pares===''||body.titulo ===''||body.tipo===''||body.issn===''||body.impacto===''||fechaValida===false){
      !fechaValida? alert('Fecha inválida'):alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/publicacion/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarPublicacion =(id_publicacion) => {
    axios.delete(`http://localhost:8000/publicacion/${id_publicacion}`)
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
  const asignarDatos = (publicacion) => {
    for (const prop in publicacion) {
      if (body[prop] === '') {
        if (['fecha'].includes(prop)) {
          //fechaValida=false;
          body[prop] = publicacion[prop].substring(0, 10);
        } else {
          body[prop] = publicacion[prop];
        }
      }
    }

  }
  const validarFecha = () => {
    if(body.fecha>maxFechaPermitida || body.fecha<minFechaPermitida || body.fecha===''){
      fechaValida=false;
     }
  }
    return (

        <div className={classes.root} >
            {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div>
        {publicaciones.map((publicacion) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }} >
                <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0, margin: "auto" }} width="100%" justifyContent="center">
                    <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                        <SchoolIcon fontSize="large" style={{ color: 'black', borderRadius: '10%', width: "5%", height: "auto" }} />
                    </Grid>
                    <Grid item xs={6} sx={{ padding: 1 }}  >
                        <Box sx={{ width: '80%', marginBottom: 2, margin: "auto" }}>
                            <TextField
                                name='autores'
                                label="Autores"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={publicacion.autores}
                                onChange={inputChange}
                                style={{ width: '100%' }} />
                            <TextField
                                name='publicador'
                                label="Publicador"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={publicacion.publicador}
                                onChange={inputChange}
                                style={{ width: '100%' }} />
                            <TextField
                                name='titulo'
                                label="Título de la Publicación"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={publicacion.titulo}
                                onChange={inputChange}
                                style={{ width: '100%' }} />
                            <Typography variant="subtitle1">Revisión por pares:</Typography>
                            <Autocomplete
                                options={['SI', "NO"]}
                                name='revision_pares'
                                defaultValue={publicacion.revision_pares ? 'SI' : 'NO'}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'revision_pares', value } })}
                            />
                            <Typography variant="subtitle1">Tipo de publicación:</Typography>
                            <Autocomplete
                                options={['LIBROS', "ARTÍCULOS", "FOLLETOS", "POLIGRAFIADOS", "REVISTAS"]}
                                name='tipo'
                                defaultValue={publicacion.tipo}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'tipo', value } })}
                            />
                            <TextField
                                name='issn'
                                label="ISSN/ISBN/DOI"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={publicacion.issn}
                                onChange={inputChange}
                                style={{ width: '100%' }} />
                        </Box>



                    </Grid>
                    <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                        <Box sx={{ width: '90%', marginBottom: 2 }}>
                            <Typography variant="subtitle1">Participación:</Typography>
                            <Autocomplete
                                options={['Autor', "Coautor"]}
                                name='tipo_participacion'
                                defaultValue={publicacion.tipo_participacion}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'tipo_participacion', value } })}
                            />

                            <Typography variant="subtitle1">Idioma:</Typography>
                            <Autocomplete
                                options={['Español', "Inglés", "Francés", "Alemán", "Chino", "Portugués", "Ruso"

                                ]}
                                name='idioma'
                                defaultValue={publicacion.idioma}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'idioma', value } })}
                            />

                            <Typography variant="subtitle1">Estado de la publicación:</Typography>
                            <Autocomplete
                                options={['Aceptado', 'Publicado'

                                ]}
                                name='estado_publicacion'
                                defaultValue={publicacion.estado_publicacion}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'estado_publicacion', value } })}
                            />

                            <Typography variant="subtitle1">Volumen:</Typography>
                            <Autocomplete
                                options={['Volumen 1', 'Volumen 2', 'Volumen 3', 'Volumen 4', 'Volumen 5'

                                ]}
                                name='numero_volumen'
                                defaultValue={publicacion.numero_volumen}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'numero_volumen', value } })}
                            />
                            <Typography variant="subtitle1">Impacto:</Typography>
                            <Autocomplete
                                options={['Alto', 'Medio', 'Bajo'

                                ]}
                                name='impacto'
                                defaultValue={publicacion.impacto}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'impacto', value } })}
                            />

                        </Box>
                        <TextField
                            style={{ paddingBottom: "15px", marginTop: 5 }}
                            name='fecha'
                            label="Fecha de publicación"
                            type="date"
                            defaultValue={publicacion.fecha.substring(0,10)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: minFechaPermitida,
                                max: maxFechaPermitida,
                            }}
                            onChange={inputChange}
                        />


                    </Grid>

                    <Box
                    display="flex"
                    marginBottom={'15px'}
                    >
                    <Button variant="contained" color="success" onClick={() => { asignarDatos(publicacion);validarFecha();actualizarPublicacion(publicacion.id_publicacion)}}>Actualizar</Button>
                    
                    <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarPublicacion(publicacion.id_publicacion);window.location.reload();}}>Eliminar</Button>
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
                      <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0, margin: "auto" }} width="100%" justifyContent="center">
                          <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                              <SchoolIcon fontSize="large" style={{ color: 'black', borderRadius: '10%', width: "5%", height: "auto" }} />
                          </Grid>
                          <Grid item xs={6} sx={{ padding: 1 }}  >
                              <Box sx={{ width: '80%', marginBottom: 2, margin: "auto" }}>
                                  <TextField
                                      name='autores'
                                      label="autores"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      onChange={inputChange}
                                      style={{ width: '100%' }} />
                                  <TextField
                                      name='publicador'
                                      label="publicador"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      onChange={inputChange}
                                      style={{ width: '100%' }} />
                                  <TextField
                                      name='titulo'
                                      label="Título de la Publicación"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      onChange={inputChange}
                                      style={{ width: '100%' }} />
                                  <Typography variant="subtitle1">Revisión por pares:</Typography>
                                  <Autocomplete
                                      options={['SI', "NO"]}
                                      name='revision_pares'
                                      margin="auto"
                                      fullWidth
                                      style={{ width: '100%' }}
                                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                                      onChange={(event, value) => inputChange({ target: { name: 'revision_pares', value } })}
                                  />
                                  <Typography variant="subtitle1">Tipo de publicación:</Typography>
                                  <Autocomplete
                                      options={['LIBROS', "ARTÍCULOS", "FOLLETOS", "POLIGRAFIADOS", "REVISTAS"]}
                                      name='tipo'
                                      margin="auto"
                                      fullWidth
                                      style={{ width: '100%' }}
                                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                                      onChange={(event, value) => inputChange({ target: { name: 'tipo', value } })}
                                  />
                                  <TextField
                                      name='issn'
                                      label="ISSN/ISBN/DOI"
                                      variant="outlined"
                                      fullWidth
                                      margin="normal"
                                      onChange={inputChange}
                                      style={{ width: '100%' }} />
                              </Box>
      
      
      
                          </Grid>
                          <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                              <Box sx={{ width: '90%', marginBottom: 2 }}>
                                  <Typography variant="subtitle1">Participación:</Typography>
                                  <Autocomplete
                                      options={['Autor', "Coautor"]}
                                      name='tipo_participacion'
                                      margin="auto"
                                      fullWidth
                                      style={{ width: '100%' }}
                                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                                      onChange={(event, value) => inputChange({ target: { name: 'tipo_participacion', value } })}
                                  />
      
                                  <Typography variant="subtitle1">Idioma:</Typography>
                                  <Autocomplete
                                      options={['Español', "Inglés", "Francés", "Alemán", "Chino", "Portugués", "Ruso"
      
                                      ]}
                                      name='idioma'
                                      margin="auto"
                                      fullWidth
                                      style={{ width: '100%' }}
                                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                                      onChange={(event, value) => inputChange({ target: { name: 'idioma', value } })}
                                  />
      
                                  <Typography variant="subtitle1">Estado de la publicación:</Typography>
                                  <Autocomplete
                                      options={['Aceptado', 'Publicado'
      
                                      ]}
                                      name='estado_publicacion'
                                      margin="auto"
                                      fullWidth
                                      style={{ width: '100%' }}
                                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                                      onChange={(event, value) => inputChange({ target: { name: 'estado_publicacion', value } })}
                                  />
      
                                  <Typography variant="subtitle1">Volumen:</Typography>
                                  <Autocomplete
                                      options={['Volumen 1', 'Volumen 2', 'Volumen 3', 'Volumen 4', 'Volumen 5'
      
                                      ]}
                                      name='numero_volumen'
                                      margin="auto"
                                      fullWidth
                                      style={{ width: '100%' }}
                                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                                      onChange={(event, value) => inputChange({ target: { name: 'numero_volumen', value } })}
                                  />
                                  <Typography variant="subtitle1">Impacto:</Typography>
                                  <Autocomplete
                                      options={['Alto', 'Medio', 'Bajo'
      
                                      ]}
                                      name='impacto'
                                      margin="auto"
                                      fullWidth
                                      style={{ width: '100%' }}
                                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                                      onChange={(event, value) => inputChange({ target: { name: 'impacto', value } })}
                                  />
      
                              </Box>
                              <TextField
                                  style={{ paddingBottom: "15px", marginTop: 10 }}
                                  name='fecha'
                                  label="Fecha de publicación"
                                  type="date"
                                  InputLabelProps={{
                                      shrink: true,
                                  }}
                                  inputProps={{
                                      min: minFechaPermitida,
                                      max: maxFechaPermitida,
                                  }}
                                  onChange={inputChange}
                              />
      
      
                          </Grid>
      
                          <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          >
          <Button variant="contained" color="success" onClick={() => {validarFecha();insertarPublicacion()} }>Agregar</Button>
          </Box>
                      </Grid>
                  </div>
            
                    )}
            
                      </div>
                    
            
            
                  )}
                </div >
            
              );
            };

export default Publicacion;