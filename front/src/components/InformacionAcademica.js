// UserProfileCard.js
import {React,useState,useContext,useLayoutEffect} from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; // Adaptador para trabajar con la librería date-fns
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { AuthContext } from '../contexts/AuthContext';

const imagenes = require.context('../../../backend_API/src/images',true);

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
      
      avatarContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        flexDirection: 'column',
        borderRadius: '50%',
        width: "100%",
        height: "100%",
      },
    
      avatar: {
        width: "100%",
        height: "100%",
      },
      buttonActualizar:{
        backgroundColor: 'blue', // Color de fondo del botón
        color: 'white', // Color del texto del botón
        padding: '10px 20px', // Espaciado interno del botón
        borderRadius: '4px', // Radio de los bordes del botón
        border: 'none', // Quita el borde del botón
        cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
      }
}));

const InformacionAcademica = ({ user, countries, roles }) => {
  const classes = useStyles();
  
  const { userEmail} = useContext(AuthContext);
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState(null);
  const [body, setBody] = useState({ institucion: '', titulo: '', nivel: '', numero_senescyt:'', campo_estudio:'',fecha_inicio:'', fecha_graduacion:'', fecha_registro:'', pais:'',anios_estudio:'' });
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useLayoutEffect(()=> {
    
    const id_docente=userEmail;
    console.log(id_docente);
    axios.get(`http://localhost:8000/educacion/${id_docente}`).then((response) => {
      setDocentes(response.data);
      setIsLoading(false);
      
      console.log(response.data);
      
    });
    
  }, []);

  const actualizarEducacion = (id_educacion) => {
    axios.put(`http://localhost:8000/educacion/${id_educacion}`, body);
    //setFormularioVisible(true);
  };
  const inputChange = ({ target }) => {
    const { name, value } = target
    setBody({
        ...body,
        [name]: value
    })

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
          shrink: true, // Hace que el label se encoja para dar espacio a la fecha seleccionada
        }}
        onChange={inputChange}
        />
        <TextField
        name='fecha_graduacion'
        style={{marginLeft:"15px"}}
        label="Fecha graduación"
        type="date" // Establece el tipo de entrada como 'date'
        defaultValue={docente.fecha_graduacion.substring(0,10)}
        InputLabelProps={{
          shrink: true, // Hace que el label se encoja para dar espacio a la fecha seleccionada
        }}
        onChange={inputChange}
        />
        
        <TextField
        style={{marginLeft:"15px"}}
        name='fecha_registro'
        label="Fecha registro"
        type="date" // Establece el tipo de entrada como 'date'
        defaultValue={docente.fecha_registro.substring(0,10)}
        InputLabelProps={{
          shrink: true, // Hace que el label se encoja para dar espacio a la fecha seleccionada
        }}
        onChange={inputChange}
        />
        <div style={{ margin: '16px' }} /> {/* Espacio en blanco entre los TextField */}
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <Button variant="contained" color="success" onClick={() => { actualizarEducacion(docente.id_educacion); }}>Actualizar</Button>
        </Box>
      </div>
           )})
        }
    </div>
      )
      }


    </div>

  );
};

export default InformacionAcademica;
