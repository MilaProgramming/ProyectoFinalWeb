// Curso.js
import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';

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
}));



const Curso = ({ user, countries, roles, tipo_doc }) => {
    const classes = useStyles();

  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [body, setBody] = useState({ nombre_curso: '', institucion: '', pais: '', anio:'', fecha_inicial:'',fecha_final:'', tipo_certificado:'', horas:'' });
  const minFechaPermitida = '1950-01-01';
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const maxFechaPermitida = `${year}-${month}-${day}`;
  let fechaValida=true;

  useLayoutEffect(()=> {
    
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/cursos/${id_docente}`).then((response) => {
      setCursos(response.data);
      setIsLoading(false);

      
    });
    
  }, []);

  const actualizarCurso = (id_curso) => {
    if(fechaValida=== false){
      alert('Fecha inválida')
    }else{
    axios.put(`http://localhost:8000/curso/${id_curso}`, body);
    }
  };
  const insertarCurso =() =>{  
    if(body.nombre_curso === '' || body.pais=== '' || body.anio=== ''|| body.tipo_certificado === '' ||body.horas===''||fechaValida===false){
      !fechaValida? alert('Fecha inválida'):alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/curso/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarCurso =(id_curso) => {
    axios.delete(`http://localhost:8000/curso/${id_curso}`)
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
  const asignarDatos = (curso) => {
    for (const prop in curso) {
      if (body[prop] === '') {
        if (['fecha_inicial', 'fecha_final'].includes(prop)) {
          //fechaValida=false;
          body[prop] = curso[prop].substring(0, 10);
        } else {
          body[prop] = curso[prop];
        }
      }
    }

  }
  const validarFecha = () => {
    if(body.fecha_inicial>maxFechaPermitida || body.fecha_inicial<minFechaPermitida || body.fecha_final>maxFechaPermitida || body.fecha_final<minFechaPermitida || body.fecha_inicial===''||body.fecha_final===''||body.fecha_inicial>body.fecha_final){
      fechaValida=false;
     }
  }
  const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => (currentYear - index).toString());

    return (

        <div className={classes.root} >
        
        
            {isLoading ? (
        <div>No se ha encontrado información.</div>
      ) : (
        <div>
        {cursos.map((curso) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }} >
                <Grid container sx={{ mt: 2, padding: 0, margin: "auto" }} width="70%" justifyContent="center">
                    <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                        <SchoolIcon fontSize="large" style={{ color: 'black', borderRadius: '10%', width: "5%", height: "auto" }} />
                    </Grid>

                    <Grid item xs={12} sm={7} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                        <Box sx={{ width: '100%', marginBottom: 2 }}>
                            <TextField
                                name='nombre_curso'
                                label="Nombre del Curso"
                                variant="outlined"
                                fullWidth
                                inputProps={{ maxLength: 150 }}
                                margin="normal"
                                defaultValue={curso.nombre_curso}
                                onChange={inputChange}
                                style={{ width: '100%' }} />
                            <TextField
                                name='institucion'
                                label="Institución"
                                variant="outlined"
                                fullWidth
                                inputProps={{ maxLength: 50 }}
                                margin="normal"
                                defaultValue={curso.institucion}
                                onChange={inputChange}
                                style={{ width: '100%' }} />
                            <TextField
                                name='pais'
                                label="País"
                                variant="outlined"
                                fullWidth
                                inputProps={{ maxLength: 30 }}
                                margin="normal"
                                defaultValue={curso.pais}
                                onChange={inputChange}
                                style={{ width: '100%' }} />
                            <Typography variant="subtitle1">Tipo de Certificado:</Typography>
                            <Autocomplete
                                options={['Aprobado', "Dictado", "Asistido"]}
                                name='tipo_certificado'
                                defaultValue={curso.tipo_certificado}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'tipo_certificado', value } })}
                            />



                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                        <Box sx={{ width: '100%', marginBottom: 2 }}>
                            <Typography variant="subtitle1">Año:</Typography>
                            <Autocomplete
                                options={years}
                                name='anio'
                                defaultValue={curso.anio}
                                margin="auto"
                                fullWidth
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                                onChange={(event, value) => inputChange({ target: { name: 'anio', value } })}
                            />
                            <TextField
                                style={{ paddingBottom: "15px", marginTop: 5, width: '100%' }}
                                name='fecha_inicial'
                                label="Fecha de inicio"
                                type="date"
                                margin="auto"
                                fullWidth
                                defaultValue={curso.fecha_inicial.substring(0,10)}
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
                                style={{ paddingBottom: "15px", marginTop: 5, width: '100%' }}
                                name='fecha_final'
                                label="Fecha de finalización"
                                type="date"
                                margin="auto"
                                fullWidth
                                defaultValue={curso.fecha_final.substring(0,10)}
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
                                defaultValue={curso.horas}
                                variant="outlined"
                                label="Número de horas"
                                type="number"
                                name='horas'
                                InputProps={{ inputProps: { min: 8 } }}
                                onChange={inputChange}
                                style={{ paddingBottom: "15px", marginTop: 5, width: '100%' }}
                            />
                        </Box>
                    </Grid>

                    <Box
        display="flex"
        marginBottom={'15px'}
        >
        <Button variant="contained" color="success" onClick={() => { asignarDatos(curso);validarFecha();actualizarCurso(curso.id_curso)}}>Actualizar</Button>
        
        <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarCurso(curso.id_curso);window.location.reload();}}>Eliminar</Button>
        </Box>
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
        <Button variant="contained" color="success" onClick={() => setFormularioVisible(true)} >Agregar información</Button>
        </Box>
        {formularioVisible && (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#f5f5f5', borderRadius: '10px' }} >
            <Grid container sx={{ mt: 2, padding: 0, margin: "auto" }} width="70%" justifyContent="center">
                <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
                    <SchoolIcon fontSize="large" style={{ color: 'black', borderRadius: '10%', width: "5%", height: "auto" }} />
                </Grid>

                <Grid item xs={12} sm={7} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                    <Box sx={{ width: '100%', marginBottom: 2 }}>
                        <TextField
                            name='nombre_curso'
                            label="Nombre del Curso"
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 150 }}
                            margin="normal"
                            onChange={inputChange}
                            style={{ width: '100%' }} />
                        <TextField
                            name='institucion'
                            label="Institución"
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            margin="normal"
                            onChange={inputChange}
                            style={{ width: '100%' }} />
                        <TextField
                            name='pais'
                            label="País"
                            variant="outlined"
                            fullWidth
                            inputProps={{ maxLength: 30 }}
                            margin="normal"
                            onChange={inputChange}
                            style={{ width: '100%' }} />
                        <Typography variant="subtitle1">Tipo de Certificado:</Typography>
                        <Autocomplete
                            options={['Aprobado', "Dictado", "Asistido"]}
                            name='tipo_certificado'
                            margin="auto"
                            fullWidth
                            style={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                            onChange={(event, value) => inputChange({ target: { name: 'tipo_certificado', value } })}
                        />



                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
                    <Box sx={{ width: '100%', marginBottom: 2 }}>
                        <Typography variant="subtitle1">Año:</Typography>
                        <Autocomplete
                            options={years}
                            name='anio'
                            margin="auto"
                            fullWidth
                            style={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                            onChange={(event, value) => inputChange({ target: { name: 'anio', value } })}
                        />
                        <TextField
                            style={{ paddingBottom: "15px", marginTop: 5, width: '100%' }}
                            name='fecha_inicial'
                            label="Fecha de inicio"
                            type="date"
                            margin="auto"
                            fullWidth
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
                            style={{ paddingBottom: "15px", marginTop: 5, width: '100%' }}
                            name='fecha_final'
                            label="Fecha de finalización"
                            type="date"
                            margin="auto"
                            fullWidth
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
                            variant="outlined"
                            label="Número de horas"
                            type="number"
                            name='horas'
                            defaultValue={8}
                            InputProps={{ inputProps: { min: 8 } }}
                            onChange={inputChange}
                            style={{ paddingBottom: "15px", marginTop: 5, width: '100%' }}
                        />
                    </Box>
                </Grid>

                <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          >
          <Button variant="contained" color="success" onClick={() => {validarFecha();insertarCurso()} }>Agregar</Button>
          </Box>
            </Grid>
        </div>

        )}
</div >

  );
};


export default Curso;