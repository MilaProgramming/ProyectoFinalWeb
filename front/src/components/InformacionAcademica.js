// UserProfileCard.js
import {React,useState,useLayoutEffect} from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        fontFamily: 'poppins, sans-serif',
      },
    
      formContainer: {
        flex: 1,
        padding: '1rem 2rem',
        border: '1px solid #ccc',
        
      },
      buttonActualizar:{
        backgroundColor: 'blue', 
        color: 'white', 
        padding: '10px 20px', 
        borderRadius: '4px', 
        border: 'none', 
        cursor: 'pointer', 
      }
}));

const InformacionAcademica = ({ user, countries, roles }) => {
  const classes = useStyles();

  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [body, setBody] = useState({ institucion: '', titulo: '', nivel: '', numero_senescyt:'', campo_estudio:'',fecha_inicio:'', fecha_graduacion:'', fecha_registro:'', pais:'',anios_estudio:'' });
  const minFechaPermitida = '2012-01-01';
  const maxFechaPermitida = '2023-07-31';
  let fechaValida=true;

  useLayoutEffect(()=> {
    
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/educacion/${id_docente}`).then((response) => {
      setDocentes(response.data);
      setIsLoading(false);

      
    });
    
  }, []);

  const actualizarEducacion = (id_educacion) => {
    if(fechaValida=== false){
      alert('Fecha inválida')
    }else{
    axios.put(`http://localhost:8000/educacion/${id_educacion}`, body);
    }
  };
  const insertarEducacion =() =>{  
    if(body.institucion === '' || body.titulo=== '' || body.nivel=== ''|| body.numero_senescyt === '' ||body.campo_estudio===''||body.pais===''||body.anios_estudio===''||fechaValida===false){
      !fechaValida? alert('Fecha inválida'):alert('Complete los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/educacion/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    }
    
  }
  const eliminarEducacion =(id_educacion) => {
    axios.delete(`http://localhost:8000/educacion/${id_educacion}`)
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
        if (['fecha_inicio', 'fecha_graduacion', 'fecha_registro'].includes(prop)) {
          fechaValida=false;
          body[prop] = docente[prop].substring(0, 10);
        } else {
          body[prop] = docente[prop];
        }
      }
    }

  }
  const validarFecha = () => {
    if(body.fecha_inicio>maxFechaPermitida || body.fecha_inicio<minFechaPermitida || body.fecha_graduacion>maxFechaPermitida || body.fecha_graduacion<minFechaPermitida || body.fecha_graduacion>maxFechaPermitida || body.fecha_registro<minFechaPermitida || body.fecha_inicio===''||body.fecha_graduacion===''||body.fecha_registro===''){
      fechaValida=false;
     }
  }
  return (
    
    <div className={classes.root}>
      {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div>
        {docentes.map((docente) => {
            return ( 
        <div className={classes.formContainer}>
        <TextField
          name='institucion'
          label="Institucion"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docente.institucion}
          onChange={inputChange}
        />
        <TextField
          name= 'titulo'
          label="Titulo"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docente.titulo}
          onChange={inputChange}
                  />
        <TextField
          name= 'nivel'
          label="Nivel"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docente.nivel}
          onChange={inputChange}
        />
        <TextField
          name= 'numero_senescyt'
          label="N Senecyt"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docente.numero_senescyt}
          onChange={inputChange}
        />
        <TextField
          name='campo_estudio'
          label="Campo de estudio"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docente.campo_estudio}
          onChange={inputChange}
        />
        <TextField
          name='pais'
          label="País"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docente.pais}
          onChange={inputChange}
        />
        <TextField
          name='anios_estudio'
          label="Años de estudio"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docente.anios_estudio}
          onChange={inputChange}
        />
        <TextField
        name='fecha_inicio'
        label="Fecha inicio"
        type="date" // Establece el tipo de entrada como 'date'
        defaultValue={docente.fecha_inicio.substring(0,10)}
        InputLabelProps={{
          shrink: true, 
        }}
        onChange={inputChange}
        />
        <TextField
        name='fecha_graduacion'
        style={{marginLeft:"15px"}}
        label="Fecha graduación"
        type="date" 
        defaultValue={docente.fecha_graduacion.substring(0,10)}
        InputLabelProps={{
          shrink: true, 
        }}
        onChange={inputChange}
        />
        
        <TextField
        style={{marginLeft:"15px"}}
        name='fecha_registro'
        label="Fecha registro"
        type="date" 
        defaultValue={docente.fecha_registro.substring(0,10)}
        InputLabelProps={{
          shrink: true, 
        }}
        onChange={inputChange}
        />
        <div style={{ margin: '16px' }} /> 
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <Button variant="contained" color="success" onClick={() => { validarFecha();asignarDatos(docente);actualizarEducacion(docente.id_educacion)}}>Actualizar</Button>
        
        <Button style={{marginLeft:"15px"}} variant="contained" color="success" onClick={() => { eliminarEducacion(docente.id_educacion);window.location.reload();}}>Eliminar</Button>
        </Box>
      </div>
           )})
        }
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{padding:'15px'}}
        >
        <Button variant="contained" color="success" onClick={() => {{setFormularioVisible(true)}}}>Agregar nueva información</Button>
        </Box>
        {formularioVisible && (
          <div className={classes.formContainer}>
          <TextField
            name='institucion'
            required
            label="Institucion"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            name= 'titulo'
            required
            label="Titulo"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            name= 'nivel'
            required
            label="Nivel"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            name= 'numero_senescyt'
            required
            label="N Senecyt"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            name='campo_estudio'
            required
            label="Campo de estudio"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            name='pais'
            required
            label="País"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            name='anios_estudio'
            required
            label="Años de estudio"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
          />
          <TextField
          name='fecha_inicio'
          required
          label="Fecha inicio"
          type="date" 
          InputLabelProps={{
            shrink: true, 
          }}
          onChange={inputChange}
          />
          <TextField
          name='fecha_graduacion'
          required
          style={{marginLeft:"15px"}}
          label="Fecha graduación"
          type="date"
          InputLabelProps={{
            shrink: true, 
          }}
          onChange={inputChange}
          />
          
          <TextField
          style={{marginLeft:"15px"}}
          required
          name='fecha_registro'
          label="Fecha registro"
          type="date" 
          InputLabelProps={{
            shrink: true, 
          }}
          onChange={inputChange}
          />
          <div style={{ margin: '16px' }} /> 
          <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          >
          <Button variant="contained" color="success" onClick={() => {validarFecha();insertarEducacion()} }>Agregar</Button>
          </Box>
          </div>

        )}

    </div>
      )
      }


    </div>

  );
};

export default InformacionAcademica;
