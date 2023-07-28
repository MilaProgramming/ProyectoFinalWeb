// UserProfileCard.js
import {React,useState,useContext,useLayoutEffect} from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
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
}));

const UserProfileCard = ({ user, countries, roles }) => {
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
        <Avatar className={classes.avatar} alt={user.name} src={imagenes(`./${docentes[0].fotografia}`)} />
        <input type="file" onChange={handleFile}/>
        <button onClick={handleUpload}>Actualizar</button>
          <Typography variant="h6" align="center">
          {docentes[0].nombre}
          </Typography>
        </div> 

      )}
      {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <div className={classes.formContainer}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docentes[0].nombre}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          defaultValue={docentes[0].correo_electronico}
        />
        {/* Add more personal data fields here */}
        <div className={classes.comboContainer}>
          <Typography variant="subtitle1">Country:</Typography>
          <Autocomplete
            options={countries}
            defaultValue={user.country}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </div>
        <div className={classes.comboContainer}>
          <Typography variant="subtitle1">Role:</Typography>
          <Select
            value={user.role}
            variant="outlined"
            fullWidth
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      )}


    </div>

  );
};

export default UserProfileCard;
