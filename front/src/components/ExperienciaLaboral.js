// UserProfileCard.js
import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

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



const SpecialCapability = ({ user, countries, roles, tipo_doc }) => {
  const classes = useStyles();

  const [expLaboral, setExpLaboral] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [body, setBody] = useState({ empresa: '', unidad_empresa: '', modalidad_contratacion: '', motivo_salida:'', pais:'',tipo_institucion:'', puesto:'', descripcion:'', fecha_inicio:'',fecha_fin:'',provincia:'' });
  const minFechaPermitida = '2012-01-01';
  const maxFechaPermitida = '2023-07-31';
  let fechaValida=true;

  useLayoutEffect(()=> {
    
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/experiencia_laboral/${id_docente}`).then((response) => {
      setExpLaboral(response.data);
      setIsLoading(false);

      
    });
    
  }, []);

  const actualizarExperienciaLaboral = (id_exp_lab) => {
    if(fechaValida=== false){
      alert('Fecha inválida')
    }else{
    axios.put(`http://localhost:8000/experiencia_laboral/${id_exp_lab}`, body);
    }
  };
  const insertarExperienciaLaboral =() =>{  
    if(body.empresa === '' || body.unidad_empresa=== '' || body.modalidad_contratacion=== ''|| body.motivo_salida === '' ||body.pais===''||body.tipo_institucion===''||body.puesto===''||body.descripcion===''||body.provincia ===''||fechaValida===false){
      !fechaValida? alert('Fecha inválida'):alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/experiencia_laboral/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarExperienciaLaboral =(id_exp_lab) => {
    axios.delete(`http://localhost:8000/experiencia_laboral/${id_exp_lab}`)
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
  const asignarDatos = (experiencia) => {
    for (const prop in experiencia) {
      if (body[prop] === '') {
        if (['fecha_inicio', 'fecha_fin'].includes(prop)) {
          //fechaValida=false;
          body[prop] = experiencia[prop].substring(0, 10);
        } else {
          body[prop] = experiencia[prop];
        }
      }
    }

  }
  const validarFecha = () => {
    if(body.fecha_inicio>maxFechaPermitida || body.fecha_inicio<minFechaPermitida || body.fecha_fin>maxFechaPermitida || body.fecha_fin<minFechaPermitida || body.fecha_inicio===''||body.fecha_fin===''){
      fechaValida=false;
     }
  }
  return (

    <div className={classes.root} >
      {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div>
        {expLaboral.map((experiencia) => {
          return (
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '10px' }} >
        <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
          <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
            <BusinessCenterIcon fontSize="large" style={{ color: 'white', background: "gray", borderRadius: '10%', width: "5%", height: "auto" }} />
          </Grid>
          <Grid item xs={6} sx={{ padding: 1, textAlign: 'center' }}  >
            <TextField
              name='empresa'
              label="Nombre de la empresa"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={experiencia.empresa}
              onChange={inputChange}
              style={{ width: '90%' }} />
            <TextField
              name='unidad_empresa'
              label="Unidad de la empresa"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={experiencia.unidad_empresa}
              onChange={inputChange}
              style={{ width: '90%' }} />
              <TextField
              name='pais'
              label="País"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={experiencia.pais}
              onChange={inputChange}
              style={{ width: '90%' }} />
              <TextField
              name='puesto'
              label="Puesto"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={experiencia.puesto}
              onChange={inputChange}
              style={{ width: '90%' }} />
            <TextField
              name='descripcion'
              label="Descripción"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={experiencia.descripcion}
              onChange={inputChange}
              style={{ width: '90%' }} />

            

          </Grid>
          <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
            <Box sx={{ width: '90%', marginBottom:2}}>
              <Typography variant="subtitle1">Modalidad de Contratación:</Typography>
              <Autocomplete
                options={['Calificación de obreras y obreros', 'cambio administrativo', 'Contrato colectivo', 'Contrato con relación de dependencia', 'Contrato servicios ocasionales',
                  'Contrato sin relación de dependencia', 'Designación directa', 'Elección popular',
                  'Libre nombramiento y remoción', 'Nombramiento permanente', 'Nombramiento provisional', 'Período fijo', 'Sin concurso de méritos y oposición',
                  'traslado administrativo', 'traspaso de puestos']}
                name='porcentaje'
                defaultValue={experiencia.modalidad_contratacion}
                margin="auto"
                fullWidth
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => inputChange({ target: { name: 'modalidad_contratacion', value } })}
              />
          
              <Typography variant="subtitle1">Motivo de salida laboral:</Typography>
              <Autocomplete
                options={['Abandono injustificado', 'Cambio administrativo', 'Cesación de funciones por destutición', 'Comisión de servicios con remuneración', 'Comisión de servicios sin remuneración',
                  'Compra de renuncia', 'Desahucio', 'Despido unilateral por parte del empleador',
                  'Incapacidad absoluta o permanente del trabajador', 'Jubilación', 'Muerte del trabajador', 'Perdida de los derechos de ciudadanía', 'Por calificación de obreros y obreras',
                  'Por remoción', 'Por retiro voluntario con indemnización',
                  'Prueba motivo de salida', 'Renuncia voluntaria', 'Sin ganar concurso de méritos y oposición', 'Supresión de puesto', 'Terminación de contrato',
                  'Traslado administrativo', 'Traspaso de puestos', 'Visto buenos'

                ]}
                name='motivo_salida'
                defaultValue={experiencia.motivo_salida}
                margin="auto"
                fullWidth
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => inputChange({ target: { name: 'motivo_salida', value } })}
              />
           
              <Typography variant="subtitle1">Tipo de institución:</Typography>
              <Autocomplete
                options={['Pública', 'Privada'

                ]}
                name='tipo_institución'
                defaultValue={experiencia.tipo_institucion}
                margin="auto"
                fullWidth
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => inputChange({ target: { name: 'tipo_institucion', value } })}
              />
            
              <Typography variant="subtitle1">Provincia:</Typography>
              <Autocomplete
                options={['Azuay', 'Bolivar', 'Cañar', 'Carchi', 'Chimborazo',
                  'Cotopaxi', 'El Oro', 'Esmeraldas',
                  'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos',
                  'Manabí', 'Morona Santiago',
                  'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
                  'Santo Domingo de los Tsáchilas', 'Sucumbios', 'Tungurahua','Zamora Chinchipe'

                ]}
                name='provincia'
                defaultValue={experiencia.provincia}
                margin="auto"
                fullWidth
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => inputChange({ target: { name: 'provincia', value } })}
              />
              
            </Box>
            <TextField
              style={{ paddingBottom: "15px",marginTop:5 }}
              name='fecha_inicio'
              label="Fecha de ingreso"
              type="date"
              defaultValue={experiencia.fecha_inicio.substring(0,10)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: minFechaPermitida,
                max: maxFechaPermitida,
              }}
              onChange={inputChange}
            />
            <TextField
              style={{ paddingBottom: "15px",marginTop:5 }}
              name='fecha_fin'
              label="Fecha de salida"
              type="date"
              defaultValue={experiencia.fecha_fin.substring(0,10)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: minFechaPermitida,
                max: maxFechaPermitida,
              }}
              onChange={inputChange}
            />
            <div style={{ margin: '16px' }} /> 
            </Grid>
        <Box
        display="flex"
        marginBottom={'15px'}
        >
        <Button variant="contained" color="success" onClick={() => { asignarDatos(experiencia);validarFecha();actualizarExperienciaLaboral(experiencia.id_exp_lab)}}>Actualizar</Button>
        
        <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarExperienciaLaboral(experiencia.id_exp_lab);window.location.reload();}}>Eliminar</Button>
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
          <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff', borderRadius: '10px' }} >
          <Grid container sx={{ boxShadow: 2, mt: 2, padding: 0 }} width="100%" justifyContent="center">
            <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
              <BusinessCenterIcon fontSize="large" style={{ color: 'white', background: "gray", borderRadius: '10%', width: "5%", height: "auto" }} />
            </Grid>
            <Grid item xs={6} sx={{ padding: 1, textAlign: 'center' }}  >
              <TextField
                name='empresa'
                label="Nombre de la empresa"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={inputChange}
                style={{ width: '90%' }} />
              <TextField
                name='unidad_empresa'
                label="Unidad de la empresa"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={inputChange}
                style={{ width: '90%' }} />
                <TextField
                name='pais'
                label="País"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={inputChange}
                style={{ width: '90%' }} />
                <TextField
                name='puesto'
                label="Puesto"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={inputChange}
                style={{ width: '90%' }} />
              <TextField
                name='descripcion'
                label="Descripción"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={inputChange}
                style={{ width: '90%' }} />
  
              
  
            </Grid>
            <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
              <Box sx={{ width: '90%', marginBottom:2}}>
                <Typography variant="subtitle1">Modalidad de Contratación:</Typography>
                <Autocomplete
                  options={['Calificación de obreras y obreros', 'cambio administrativo', 'Contrato colectivo', 'Contrato con relación de dependencia', 'Contrato servicios ocasionales',
                    'Contrato sin relación de dependencia', 'Designación directa', 'Elección popular',
                    'Libre nombramiento y remoción', 'Nombramiento permanente', 'Nombramiento provisional', 'Período fijo', 'Sin concurso de méritos y oposición',
                    'traslado administrativo', 'traspaso de puestos']}
                  name='porcentaje'
                  margin="auto"
                  fullWidth
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  onChange={(event, value) => inputChange({ target: { name: 'modalidad_contratacion', value } })}
                />
            
                <Typography variant="subtitle1">Motivo de salida laboral:</Typography>
                <Autocomplete
                  options={['Abandono injustificado', 'Cambio administrativo', 'Cesación de funciones por destutición', 'Comisión de servicios con remuneración', 'Comisión de servicios sin remuneración',
                    'Compra de renuncia', 'Desahucio', 'Despido unilateral por parte del empleador',
                    'Incapacidad absoluta o permanente del trabajador', 'Jubilación', 'Muerte del trabajador', 'Perdida de los derechos de ciudadanía', 'Por calificación de obreros y obreras',
                    'Por remoción', 'Por retiro voluntario con indemnización',
                    'Prueba motivo de salida', 'Renuncia voluntaria', 'Sin ganar concurso de méritos y oposición', 'Supresión de puesto', 'Terminación de contrato',
                    'Traslado administrativo', 'Traspaso de puestos', 'Visto buenos'
  
                  ]}
                  name='motivo_salida'
                  margin="auto"
                  fullWidth
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  onChange={(event, value) => inputChange({ target: { name: 'motivo_salida', value } })}
                />
             
                <Typography variant="subtitle1">Tipo de institución:</Typography>
                <Autocomplete
                  options={['Pública', 'Privada'
  
                  ]}
                  name='tipo_institución'
                  margin="auto"
                  fullWidth
                  style={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} variant="outlined" />}
                  onChange={(event, value) => inputChange({ target: { name: 'tipo_institucion', value } })}
                />
              
                <Typography variant="subtitle1">Provincia:</Typography>
                <Autocomplete
                  options={['Azuay', 'Bolivar', 'Cañar', 'Carchi', 'Chimborazo',
                    'Cotopaxi', 'El Oro', 'Esmeraldas',
                    'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos',
                    'Manabí', 'Morona Santiago',
                    'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
                    'Santo Domingo de los Tsáchilas', 'Sucumbios', 'Tungurahua','Zamora Chinchipe'
  
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
                style={{ paddingBottom: "15px",marginTop:5 }}
                name='fecha_inicio'
                label="Fecha de ingreso"
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
              <TextField
                style={{ paddingBottom: "15px",marginTop:5 }}
                name='fecha_fin'
                label="Fecha de salida"
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
              <div style={{ margin: '16px' }} /> 
              </Grid>
              <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          >
          <Button variant="contained" color="success" onClick={() => {validarFecha();insertarExperienciaLaboral()} }>Agregar</Button>
          </Box>
            
            
          
          </Grid>
        </div>

        )}

          </div>
        


      )}
    </div >

  );
};

export default SpecialCapability;