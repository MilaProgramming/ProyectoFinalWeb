// UserProfileCard.js
import {React,useState,useContext,useLayoutEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const imagenes = require.context('../../../backend_API/src/images',true);

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent : 'center',
      borderRadius: 10,
      fontFamily: 'poppins, sans-serif',
    },

    rootA: {
      display: 'flex',
      alignItems: 'center',
      justifyContent : 'center',
      flexDirection: 'column',
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      fontFamily: 'poppins, sans-serif',
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

    new: {
      flex: 1,
      display: 'flex',
      borderRadius: '0.5rem',
      alignItems: 'left',
      gap: '1rem',
      justifyContent : 'center',
      width: '100%', height: 'auto',
      marginBottom: '1rem',
      marginTop: '-1rem',
    },

    space: {
      flex: 1,
      marginTop: '-0.8rem',
      width: '100%',
      marginLeft: '1rem',
    },

    spaceD: {
      flex: 1,
      width: '100%',
      marginRight: '1rem',
    },
    /* Estilo del botón que se muestra */
    customFile: {
      backgroundColor: 'green',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    fotoPerfil:{
      height:'300px',
    }


}));



const UserProfileCard = ({ user, countries, roles, tipo_doc }) => {
  const classes = useStyles();
  const [file, setFile] =useState();
  const [artistasList, setArtistasList] = useState([]);
  const { userEmail} = useContext(AuthContext);
  const handleFile = (e) => {
    setFile(e.target.files[0])
  }
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append('image', file);
    const id_docente=userEmail;
    axios.post(`http://localhost:8000/upload/${id_docente}`,formdata)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(()=> {
    const id_docente=userEmail;
    console.log(id_docente);
    axios.get(`http://localhost:8000/docente/${id_docente}`).then((response) => {
      setDocentes(response.data);
      setIsLoading(false);
      console.log(response.data);
      
    });
    
  }, []);
  return (

    <div className={classes.root}>
        {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div className={classes.avatarContainer}>
        <img className={classes.fotoPerfil} alt={user.name} src={imagenes(`./${docentes[0].fotografia}`)} />
          <Typography variant="h6" align="center">
          {docentes[0].nombre}
          </Typography>
          <input className={classes.customFile} type="file" onChange={handleFile}/>
        <div style={{ margin: '16px' }} /> {/* Espacio en blanco entre los TextField */}
        <Button variant="contained" color="success"  onClick={handleUpload}>Actualizar</Button>
        </div> 

      )}
      {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div className={classes.formContainer}>
        <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={user.name}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={user.name}
          />   
          <Typography variant="subtitle1">Tipo de documento:</Typography>
            <Autocomplete
              options={tipo_doc}
              defaultValue={docentes[0].tipo_documento}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          <TextField
          label="Número de Documento"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={user.name}
      />     
          <TextField
          label="Ciudad de Residencia"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={user.name}
          />        
          <TextField
          label="Dirección"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={user.name}
          />
          <TextField
            label="Correo"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={user.email}
          />
          <TextField
          style={{paddingBottom:"15px"}}
            label="Número de teléfono"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={user.email}
          />
          <TextField
          style={{paddingBottom:"15px"}}
          label="Fecha nacimiento"
          type="date" // Establece el tipo de entrada como 'date'
          defaultValue={user.date}
          InputLabelProps={{
            shrink: true, // Hace que el label se encoja para dar espacio a la fecha seleccionada
          }}
          />

        {/* Add more personal data fields here */}
        
      </div>

      )}

    

    </div>

  );
};

export default UserProfileCard;
