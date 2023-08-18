// UserProfileCard.js
import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';

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
const popularLanguages = [
    'Inglés',
    'Español',
    'Francés',
    'Alemán',
    'Italiano',
    'Chino Mandarín',
    'Japonés',
    'Portugués',
    'Árabe',
    'Ruso',
    'Coreano',
    // Agrega aquí más idiomas populares si lo deseas
];



const Idioma = () => {
    const classes = useStyles();

  const [idiomas, setIdiomas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [body, setBody] = useState({ nombre: '', porcentaje_hablado: '', porcentaje_escrito: '', porcentaje_comprension:''});
  useLayoutEffect(()=> {
    
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/idiomas/${id_docente}`).then((response) => {
      setIdiomas(response.data);
      setIsLoading(false);

      
    });
    
  }, []);

  const actualizarIdioma = (id_idioma) => {

    axios.put(`http://localhost:8000/idioma/${id_idioma}`, body);
    
  };
  const insertarIdioma =() =>{  
    if(body.nombre === '' || body.porcentaje_hablado=== '' || body.porcentaje_escrito=== ''|| body.porcentaje_comprension === ''){
      alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/idioma/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarIdioma =(id_idioma) => {
    axios.delete(`http://localhost:8000/idioma/${id_idioma}`)
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
            {idiomas.map((idioma) => {
            return (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }} >
                <Grid container sx={{ mt: 2, padding: 0 }} width="80%" justifyContent="center">
                    <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                        <LanguageIcon fontSize="large" style={{ color: 'black', background: "white", borderRadius: '10%', width: "5%", height: "auto" }} />

                    </Grid>
                    <Grid item xs={12} sm={6} maxWidth="sm" width="90%" sx={{ padding: 1 }} justifyContent="center" >
                        <Box sx={{ width: '90%', margin: 'auto' }}>
                           
                            <Typography variant="subtitle1">Idioma:</Typography>
                             <Autocomplete
                                
                                options={popularLanguages}
                                name='nombre'
                                defaultValue={idioma.nombre}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'nombre', value } })}
                                limitTags={10} // Limita a 10 etiquetas seleccionadas
                                size="small"
                                fullWidth
                            />




                           <Typography variant="subtitle1">Porcentaje Hablado:</Typography>
                            <Autocomplete
                                options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                                name='porcentaje_hablado'
                                defaultValue={idioma.porcentaje_hablado}
                                margin="normal"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'porcentaje_hablado', value } })}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} maxWidth="sm" width="90%" sx={{ padding: 1 }} justifyContent="center" >
                        <Box sx={{ width: '90%', margin: 'auto' }}>
                            <Typography variant="subtitle1">Porcentaje Escrito:</Typography>
                            <Autocomplete
                                options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                                name='porcentaje_escrito'
                                defaultValue={idioma.porcentaje_escrito}
                                margin="normal"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'porcentaje_escrito', value } })}
                            />
                            <Typography variant="subtitle1">Porcentaje Comprensión:</Typography>
                            <Autocomplete
                                options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                                name='porcentaje_comprension'
                                defaultValue={idioma.porcentaje_comprension}
                                margin="normal"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'porcentaje_comprension', value } })}
            />
                        </Box>
                    </Grid>
                    <Box
        display="flex"
        marginBottom={'15px'}
        >
        <Button variant="contained" color="success" onClick={() => { asignarDatos(idioma);actualizarIdioma(idioma.id_idioma)}}>Actualizar</Button>
        
        <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarIdioma(idioma.id_idioma);window.location.reload();}}>Eliminar</Button>
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
        <Button variant="contained" color="success" onClick={() => setFormularioVisible(true)}>Agregar idioma</Button>
        </Box>
        {formularioVisible && (
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }} >
          <Grid container sx={{ mt: 2, padding: 0 }} width="80%" justifyContent="center">
              <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                  <LanguageIcon fontSize="large" style={{ color: 'black', background: "white", borderRadius: '10%', width: "5%", height: "auto" }} />

              </Grid>
              <Grid item xs={12} sm={6} maxWidth="sm" width="90%" sx={{ padding: 1 }} justifyContent="center" >
                  <Box sx={{ width: '90%', margin: 'auto' }}>
                     
                      <Typography variant="subtitle1">Idioma:</Typography>
                       <Autocomplete
                          
                          options={popularLanguages}
                          name='nombre'
                          getOptionLabel={(option) => option}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'nombre', value } })}
                          limitTags={10} // Limita a 10 etiquetas seleccionadas
                          size="small"
                          fullWidth
                      />




                     <Typography variant="subtitle1">Porcentaje Hablado:</Typography>
                      <Autocomplete
                          options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                          name='porcentaje_hablado'
                          margin="normal"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'porcentaje_hablado', value } })}
                      />
                  </Box>
              </Grid>
              <Grid item xs={12} sm={6} maxWidth="sm" width="90%" sx={{ padding: 1 }} justifyContent="center" >
                  <Box sx={{ width: '90%', margin: 'auto' }}>
                      <Typography variant="subtitle1">Porcentaje Escrito:</Typography>
                      <Autocomplete
                          options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                          name='porcentaje_escrito'
                          margin="normal"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'porcentaje_escrito', value } })}
                      />
                      <Typography variant="subtitle1">Porcentaje Comprensión:</Typography>
                      <Autocomplete
                          options={['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']}
                          name='porcentaje_comprension'
                          margin="normal"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'porcentaje_comprension', value } })}
      />
                  </Box>
              </Grid>
              

              <Box
  display="flex"
  marginBottom={'15px'}
  >
  <Button variant="contained" color="success" onClick={() => { insertarIdioma()}}>Agregar</Button>
  
  </Box>
          </Grid>
      </div>

        )}

          </div>
        


      )}
    </div >

  );
};

export default Idioma;