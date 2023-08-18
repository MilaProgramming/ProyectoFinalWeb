import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


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



const SpecialCapability = ({ user, countries, roles, tipo_doc }) => {
    const classes = useStyles();
  const [body, setBody] = useState({ tipo_institucion: '', nombre_institucion: '', tipo_cuenta: '',numero_cuenta: '' });
  const [infBancaria,setInfBancaria] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showCustomInputNew, setShowCustomInputNew] = useState(false);
  const [id,setId] = useState("");
  let numeroValido = true;




  useLayoutEffect(()=> {  
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/informacion_bancaria/${id_docente}`).then((response) => {
      setInfBancaria(response.data);  
      setIsLoading(false);

      
    });
  }, []);

  const actualizarInformacionBancaria = (id_inf_bancaria) => {
    if(numeroValido===false){
      alert('Número de cuenta invalido')
    }else{
    axios.put(`http://localhost:8000/informacion_bancaria/${id_inf_bancaria}`, body);
    }
  };
  const insertarInformacion =() =>{  
    if(body.tipo_institucion === '' || body.nombre_institucion=== '' || body.tipo_cuenta=== ''|| body.numero_cuenta === '' ||numeroValido===false){
      !numeroValido?alert('Número de cuenta inválido') :alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/informacion_bancaria/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarInformacion =(id_inf_bancaria) => {
    axios.delete(`http://localhost:8000/informacion_bancaria/${id_inf_bancaria}`)
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
  const handleAutocompleteChange = (event,value,id) => {
    if (value === 'otros') {
      setShowCustomInput(true);
      setId(id);
    } else {
      setShowCustomInput(false);
      body.nombre_institucion= value;
    }
  };

  const handleCustomInputChange = event => {
    if(event.target.value===''){
      alert('No deje campos vacíos')
    }else{
    body.nombre_institucion= event.target.value;
    }
  };
  const handleAutocompleteChangeNew = (event, value) => {
    if (value === 'otros') {
      setShowCustomInputNew(true);
     
    } else {
      setShowCustomInputNew(false);
      body.nombre_institucion= value;
    }
  };

  const handleCustomInputChangeNew = event => {
    if(event.target.value===''){
      alert('No deje campos vacíos')
    }else{
    body.nombre_institucion= event.target.value;
    }
  };
  const validarNumeros=()=>{
    if(body.numero_cuenta.length>15){
      numeroValido=false;
    }
  }
    return (

        <div className={classes.root} >
            {isLoading ? (
                <div>Cargando datos ...</div>
            ): (
                <div>
            {infBancaria.map((informacion) => {
            return (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '10px' }} >
                <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
                    <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                        <AccountBalanceIcon fontSize="large" style={{ color: 'black', background: "white", borderRadius: '10%', width: "5%", height: "auto" }} />

                    </Grid>

                    <Grid item xs={12} sm={12} maxWidth="sm" width="90%" sx={{ padding: 1 }} justifyContent="center" >
                        <Box sx={{ width: '90%', margin: 'auto' }}>

                            <Typography variant="subtitle1">Tipo de Institución financiera:</Typography>
                            <Autocomplete
                                options={['BANCO', 'MUTUALISTA', 'COOPERATIVA DE AHORRO Y CRÉDITO']}
                                name='tipo_institucion'
                                defaultValue={informacion.tipo_institucion}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'tipo_institucion', value } })}
                            />
                        

                            <Typography variant="subtitle1">Nombre de Institución financiera:</Typography>
                            <Autocomplete
                                options={['AUSTRO', 'AMAZONAS', 'BANECUADOR', 'BOLIVARIANO', 'CAPITAL S.A CORFINSA', 'CENTRAL',
                                    'CITYBANK', 'COMERCIAL DE MANABÍ', 'COOPNACIONAL', 'DEL LITORAL', 'DELBANK S.A', 'ECUATORIANO DE LA VIVIENDA',
                                    'FOMENTO', 'GUAYAQUIL', 'INTERNACIONAL', 'LLOYDS BANK', 'LOJA', 'MACHALA',
                                    'MM JARAMILLO', 'PACÍFICO', 'PROAMERICA', 'PROCREDIT', 'PRODUBANCO', 'PICHINCHA',
                                    'PROMERICA', 'RUMIÑANUI', 'SOLIDARIO', 'SUDAMERICANO', 'TERRITORIAL', 'UNIBANCO','otros']}
                                name='nombre_institucion'
                                defaultValue={informacion.nombre_institucion}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => handleAutocompleteChange(event, value, informacion.id_inf_bancaria)}
                                />
                            <br/>
                                {showCustomInput && informacion.id_inf_bancaria===id && (
                                <TextField
                                    label="Nombre de la Institución"
                                    variant="outlined"
                                    //value={customInstitucion}
                                    onChange={handleCustomInputChange}
                                />
                                )}
                        

                            <Typography variant="subtitle1">Tipo de Cuenta:</Typography>
                            <Autocomplete
                                options={['Corriente', 'Ahorros']}
                                name='tipo_cuenta'
                                defaultValue={informacion.tipo_cuenta}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'tipo_cuenta', value } })}
                            />


                            <TextField
                                name='numero_cuenta'
                                label="Número de cuenta"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={informacion.numero_cuenta}
                                onChange={inputChange}
                                type="number"
                                style={{ width: '100%' }} />
                        </Box>

                    </Grid>

                    <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                        <Button style={{ marginLeft: "15px" }} variant="contained" color="success" onClick={() => {asignarDatos(informacion);validarNumeros();actualizarInformacionBancaria(infBancaria[0].id_inf_bancaria);window.location.reload()}} >Actualizar</Button>
                        <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarInformacion(informacion.id_inf_bancaria);window.location.reload();}}>Eliminar</Button>

                        
                    </Grid>
                </Grid>
            </div>
            )})}
            <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{padding:'15px'}}
        >
        <Button variant="contained" color="success" onClick={() => setFormularioVisible(true)}>Agregar informacion</Button>
        </Box>
        {formularioVisible && (
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '10px' }} >
          <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
              <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                  <AccountBalanceIcon fontSize="large" style={{ color: 'black', background: "white", borderRadius: '10%', width: "5%", height: "auto" }} />

              </Grid>

              <Grid item xs={12} sm={12} maxWidth="sm" width="90%" sx={{ padding: 1 }} justifyContent="center" >
                  <Box sx={{ width: '90%', margin: 'auto' }}>

                      <Typography variant="subtitle1">Tipo de Institución financiera:</Typography>
                      <Autocomplete
                          options={['BANCO', 'MUTUALISTA', 'COOPERATIVA DE AHORRO Y CRÉDITO']}
                          name='tipo_institucion'
                          margin="auto"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'tipo_institucion', value } })}
                      />
                  

                      <Typography variant="subtitle1">Nombre de Institución financiera:</Typography>
                      <Autocomplete
                                options={['AUSTRO', 'AMAZONAS', 'BANECUADOR', 'BOLIVARIANO', 'CAPITAL S.A CORFINSA', 'CENTRAL',
                                    'CITYBANK', 'COMERCIAL DE MANABÍ', 'COOPNACIONAL', 'DEL LITORAL', 'DELBANK S.A', 'ECUATORIANO DE LA VIVIENDA',
                                    'FOMENTO', 'GUAYAQUIL', 'INTERNACIONAL', 'LLOYDS BANK', 'LOJA', 'MACHALA',
                                    'MM JARAMILLO', 'PACÍFICO', 'PROAMERICA', 'PROCREDIT', 'PRODUBANCO', 'PICHINCHA',
                                    'PROMERICA', 'RUMIÑANUI', 'SOLIDARIO', 'SUDAMERICANO', 'TERRITORIAL', 'UNIBANCO','otros']}
                                name='nombre_institucion'
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => handleAutocompleteChangeNew(event, value)}
                                />
                            <br/>
                                {showCustomInputNew && (
                                <TextField
                                    label="Nombre de la Institución"
                                    variant="outlined"
                                    //value={customInstitucion}
                                    onChange={handleCustomInputChangeNew}
                                />
                                )}
                  

                      <Typography variant="subtitle1">Tipo de Cuenta:</Typography>
                      <Autocomplete
                          options={['Corriente', 'Ahorros']}
                          name='tipo_cuenta'
                          margin="auto"
                          fullWidth
                          style={{ width: '100%' }}
                          renderInput={(params) => <TextField {...params} variant="outlined" />}
                          onChange={(event, value) => inputChange({ target: { name: 'tipo_cuenta', value } })}
                      />


                      <TextField
                          name='numero_cuenta'
                          label="Número de cuenta"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          onChange={inputChange}
                          type="number"
                          style={{ width: '100%' }} />
                  </Box>

              </Grid>

              <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                  <Button variant="contained" color="success" onClick={() => { validarNumeros();insertarInformacion()}}>Agregar</Button>

                  
              </Grid>
          </Grid>
      </div>
  

        )}

          </div>
        


      )}
    </div >

  );
};


export default SpecialCapability;