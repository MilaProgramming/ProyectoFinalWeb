// UserProfileCard.js
import {React,useState,useContext,useLayoutEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const imagenes = require.context('../../../backend_API/src/images',true);

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'block',
      alignItems: 'center',
      justifyContent : 'center',
      borderRadius: 10,
      fontFamily: 'poppins, sans-serif',
    },
    formContainer: {
      display:'block',
      padding: '1rem 2rem',
      marginTop:'15px',
      borderRadius: '7px',
      backgroundColor: '#EAEAEA '

    },
    
    avatarContainer: {
      display: 'block',
      borderRadius: '0.5rem',
    },
    customFile: {
      fontFamily: 'poppins, sans-serif',
      backgroundColor: 'green', 
      color: 'white', 
      padding: '8px', 
      borderRadius: '4px', 
      cursor: 'pointer', 
      fontSize:'15px' 
    },
    fotoPerfil:{
      height:'130px',
      borderRadius:'7px'
    }


}));



const UserProfileCard = ({ user, countries, roles, tipo_doc }) => {
  const classes = useStyles();
  const [file, setFile] =useState();
  const [body, setBody] = useState({ tipo_documento: '', numero_documento: '', genero: '', estado_civil:'', nacionalidad:'',etnia:'', nombre:'', apellido:'', ciudad_residencia:'',provincia:'',direccion:'',correo_electronico:'',correo_alterno:'',tipo_sangre:'',numero_telefono:'',fecha_nacimiento:''});
  const [formularioVisible, setFormularioVisible] = useState(false);
  const handleFile = (e) => {
    setFile(e.target.files[0])
  }
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append('image', file);
    const id_docente=localStorage.getItem("id_docente");
    axios.post(`http://localhost:8000/upload/${id_docente}`,formdata)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    setFormularioVisible(false)
  }
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete,setIsComplete] = useState(true);
  const [isValidDate,setIsValidDate] = useState(true);
  const minFechaPermitida = '2012-01-01';
  const maxFechaPermitida = '2023-07-31';
  useLayoutEffect(()=> {
    const id_docente=localStorage.getItem("id_docente");;
    console.log(id_docente);
    axios.get(`http://localhost:8000/docente/${id_docente}`).then((response) => {
      setDocentes(response.data);
      setIsLoading(false);
      
    });
    
  }, []);
  const actualizarDocente = () => {
    if(isComplete == false){
      alert('Complete todos los campos');
    }else{
    const id_docente=localStorage.getItem("id_docente");
    axios.put(`http://localhost:8000/docente/${id_docente}`, body);
    }
  };
  const inputChange = ({ target }) => {
    console.log(body.tipo_documento)
    const { name, value } = target
    setBody({
        ...body,
        [name]: value
    })

  }
  const asignarDatos = (docente) => {
    for (const prop in docente) {
      if (body[prop] === '') {
        setIsComplete(false);
        if (['fecha_nacimiento'].includes(prop)) {
          body[prop] = docente[prop].substring(0, 10);
        } else {
          body[prop] = docente[prop];
        }
      }
    }
  }
  return (

    <div className={classes.root}>
        {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div className={classes.avatarContainer}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Imagen de perfil */}
      <img
        className={classes.fotoPerfil}
        alt={user.name}
        src={imagenes(`./${docentes[0].fotografia}`)}
      />

      {/* Botón en la esquina inferior derecha */}
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => setFormularioVisible(true)}
        startIcon={<CameraIcon />}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        
      </Button>
    </div>

        {/* Coloca el texto al lado de la imagen dentro del mismo contenedor */}
        <Typography variant="h6" style={{padding:'15px'}}>
          { 'Bienvenido'+ ' ' +docentes[0].nombre + ' ' + docentes[0].apellido}
        </Typography>
        </div> 
        {formularioVisible && (
          <>
          <div style={{ margin: '16px' }} /> {/* Espacio en blanco entre los TextField */}
          <label className={classes.customFile} >
      {/* Botón personalizado */}
      SELECCIONAR ARCHIVO
      {/* Input oculto */}
      <input
        type="file"
        onChange={handleFile}
        style={{ display: 'none' }} // Ocultar el input
      />
    </label>
          <Button style={{marginLeft:"15px"}}  variant="contained" color="success" onClick={handleUpload} >Actualizar
           </Button>
           </>
        )}

        </div>
        

      )}
      {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div className={classes.formContainer}>
          
        <TextField
            label="Nombre"
            name='nombre'
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={docentes[0].nombre}
            onChange={inputChange}
          />
          <TextField
            label="Apellido"
            name='apellido'
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={docentes[0].apellido}
            onChange={inputChange}
          />   
          <Typography variant="subtitle1">Tipo de documento:</Typography>
            <Autocomplete
              options={tipo_doc}
              defaultValue={docentes[0].tipo_documento}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
              onChange={(event, value) => body.tipo_documento=value}
            />
            
          <TextField
          label="Número de Documento"
          name='numero_documento'
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docentes[0].numero_documento}
          onChange={inputChange}
      />     
          <Typography variant="subtitle1">Género:</Typography>
            <Autocomplete
              options={['Femenino', 'Masculino', 'Otro', 'Prefiero no decirlo']}
              name='genero'
              defaultValue={docentes[0].genero}
              renderInput={(params) => <TextField {...params} variant="outlined"/>}
              onChange={(event, value) => body.genero=value}

            />
            <Typography variant="subtitle1">Estado Civil:</Typography>
            <Autocomplete
              name='estado_civil'
              options={['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']}
              defaultValue={docentes[0].estado_civil}
              renderInput={(params) => <TextField {...params} variant="outlined"/>}
              onChange={(event, value) => body.estado_civil=value}
            />
            <TextField
            label="Nacionalidad"
            name='nacionalidad'
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={docentes[0].nacionalidad}
            onChange={inputChange}
          /> 
          <Typography variant="subtitle1">Etnia:</Typography>
            <Autocomplete
            label='etnia'
            name='etnia'
              options={['Indígena', 'Mestizo', 'Afroecuatoriano', 'Montubio', 'Blancos']}
              defaultValue={docentes[0].etnia}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
              onChange={(event, value) => body.etnia=value}
              
            />
          <TextField
          label="Ciudad de Residencia"
          name='ciudad_residencia'
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docentes[0].ciudad_residencia}
          onChange={inputChange}
          /> 
          <TextField
          label="Provincia"
          name='provincia'
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docentes[0].provincia}
          onChange={inputChange}
          />        
          <TextField
          label="Dirección"
          name='direccion'
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docentes[0].direccion}
          onChange={inputChange}
          />
          <TextField
            label="Correo"
            name='correo_electronico'
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={docentes[0].correo_electronico}
            onChange={inputChange}
          />
          <TextField
            label="Correo Alterno"
            name='correo_alterno'
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={docentes[0].correo_alterno}
            onChange={inputChange}
          />
          <TextField
          style={{paddingBottom:"15px"}}
            label="Número de teléfono"
            name='numero_telefono'
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={docentes[0].numero_telefono}
            onChange={inputChange}
          />
          <Typography variant="subtitle1">Tipo de sangre:</Typography>
            <Autocomplete
              options={[ 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+','O-']}
              name='tipo_sangre'
              defaultValue={docentes[0].tipo_sangre}
              renderInput={(params) => <TextField {...params} variant="outlined"  />}
              onChange={(event, value) => body.tipo_sangre=value}
              
            />
            <div style={{ margin: '16px' }} /> {/* Espacio en blanco entre los TextField */}
          <TextField
          style={{paddingBottom:"15px"}}
          name='fecha_nacimiento'
          label="Fecha nacimiento"
          type="date" // Establece el tipo de entrada como 'date'
          defaultValue={docentes[0].fecha_nacimiento.substring(0,10)}
          InputLabelProps={{
            shrink: true, // Hace que el label se encoja para dar espacio a la fecha seleccionada
          }}
          inputProps={{
            min: minFechaPermitida,
            max: maxFechaPermitida,
          }}
          onChange={inputChange}
          />

        {/* Add more personal data fields here */}
        <div style={{ margin: '16px' }} /> {/* Espacio en blanco entre los TextField */}
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <Button variant="contained" color="success"  onClick={() => { asignarDatos(docentes[0]);actualizarDocente();window.location.reload()  }}>Actualizar Datos</Button>
        </Box>
      </div>

      )}

    

    </div>

  );
};

export default UserProfileCard;
