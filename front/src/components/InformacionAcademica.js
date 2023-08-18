// UserProfileCard.js
import {React,useState,useLayoutEffect} from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
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
  const [universidades,setUniversidades] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showCustomInputNew, setShowCustomInputNew] = useState(false);
  const [id,setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [body, setBody] = useState({ institucion: '', titulo: '', nivel: '', numero_senescyt:'', campo_estudio:'',fecha_inicio:'', fecha_graduacion:'', fecha_registro:'', pais:'',anios_estudio:'' });
  const minFechaPermitida = '1950-01-01';
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const maxFechaPermitida = `${year}-${month}-${day}`;
  let fechaValida=true;
  let numeroValido = true;

  useLayoutEffect(()=> {
    
    const id_docente=localStorage.getItem("id_docente");
    axios.get(`http://localhost:8000/educacion/${id_docente}`).then((response) => {
      setDocentes(response.data);
      fetch('http://universities.hipolabs.com/search')
      .then(response => response.json())
      .then(data => {
        const universitiesWithCountry = data.map(university => ({
          name: university.name,
          country: university.country
        }));
    
        const sortedUniversities = universitiesWithCountry.sort((a, b) => {
          if (a.country < b.country) {
            return -1;
          }
          if (a.country > b.country) {
            return 1;
          }
          return 0;
        });
    
        const formattedUniversities = sortedUniversities.map(university => `${university.name} (${university.country})`);
        setUniversidades(formattedUniversities);
        setIsLoading(false);
          })
          
      .catch(error => {
        console.error('Error:', error);
      });
      

      
    });
    
    
  }, []);

  const actualizarEducacion = (id_educacion) => {
    if(fechaValida=== false|| numeroValido===false){
      !numeroValido? alert('Número de Senecyt inválido') : alert('Fecha inválida');
    }else{
    axios.put(`http://localhost:8000/educacion/${id_educacion}`, body);
    setShowCustomInput(false);
    }
  };
  const insertarEducacion =() =>{  
    if(body.institucion === '' || body.titulo=== '' || body.nivel=== ''|| body.numero_senescyt === '' ||body.campo_estudio===''||body.pais===''||body.anios_estudio===''||fechaValida===false || numeroValido===false){
      !fechaValida? alert('Fecha inválida'):(!numeroValido? alert('Número de Senecyt inválido'):alert('Complete los campos'));
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/educacion/${id_docente}`, body);
    window.location.reload();
    setFormularioVisible(false);  
    setShowCustomInputNew(false);
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
          //fechaValida=false;
          body[prop] = docente[prop].substring(0, 10);
        } else {
          body[prop] = docente[prop];
        }
      }
    }

  }
  const validarFecha = () => {
    if(body.fecha_inicio>maxFechaPermitida || body.fecha_inicio<minFechaPermitida || body.fecha_graduacion>maxFechaPermitida || body.fecha_graduacion<minFechaPermitida || body.fecha_registro>maxFechaPermitida || body.fecha_registro<minFechaPermitida || body.fecha_inicio===''||body.fecha_graduacion===''||body.fecha_registro===''||body.fecha_inicio>body.fecha_graduacion|| body.fecha_inicio>body.fecha_registro||body.fecha_graduacion>body.fecha_registro){
      fechaValida=false;
     }
  }
  const validarNumero = () => {
    if(body.numero_senescyt.length>20){
      numeroValido=false;
    }
  }
  
  const handleAutocompleteChange = (event,value,id) => {
    if (value === 'otros') {
      setShowCustomInput(true);
      setId(id);
    } else {
      setShowCustomInput(false);
      body.institucion= value;
    }
  };

  const handleCustomInputChange = event => {
    if(event.target.value===''){
      alert('No deje campos vacíos')
    }else{
    body.institucion= event.target.value;
    }
  };
  const handleAutocompleteChangeNew = (event, value) => {
    if (value === 'otros') {
      setShowCustomInputNew(true);
     
    } else {
      setShowCustomInputNew(false);
      body.institucion= value;
    }
  };

  const handleCustomInputChangeNew = event => {
    if(event.target.value===''){
      alert('No deje campos vacíos')
    }else{
    body.institucion= event.target.value;
    }
  };

  return (
    
    <div className={classes.root}>
      {isLoading ? (
        <div>Cargando información...</div>
      ) : (
        <div>
        {docentes.map((docente) => {
            return ( 
        <div className={classes.formContainer}>
          <Typography variant="subtitle1">Institución:</Typography>

          <Autocomplete
        name='institucion'
        options={[...universidades, 'otros']}
        defaultValue={docente.institucion}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        onChange={(event, value) => handleAutocompleteChange(event, value, docente.id_educacion)}
        />
      <br/>
        {showCustomInput && docente.id_educacion===id && (
          <TextField
            label="Nombre de la Universidad"
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            //value={customInstitucion}
            onChange={handleCustomInputChange}
          />
        )}
        <TextField
          name= 'titulo'
          label="Titulo"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 50 }}
          defaultValue={docente.titulo}
          onChange={inputChange}
                  />
        <TextField
          name= 'nivel'
          label="Nivel"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 20 }}
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
          type="number"
        />
        <TextField
          name='campo_estudio'
          label="Campo de estudio"
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 30 }}
          margin="normal"
          defaultValue={docente.campo_estudio}
          onChange={inputChange}
        />
        <TextField
          name='pais'
          label="País"
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 30 }}
          margin="normal"
          defaultValue={docente.pais}
          onChange={inputChange}
        />
        <TextField
          name='anios_estudio'
          label="Años de estudio"
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 20 }}
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
        <Button variant="contained" color="success" onClick={() => { asignarDatos(docente);validarFecha();validarNumero();actualizarEducacion(docente.id_educacion)}}>Actualizar</Button>
        
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
        <Button variant="contained" color="success" onClick={() => setFormularioVisible(true)}>Agregar información</Button>
        </Box>
        {formularioVisible && (
          <div className={classes.formContainer}>
          <Typography variant="subtitle1">Institución:</Typography>

          <Autocomplete
          name='institucion'
          options={[...universidades, 'otros']}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          onChange={handleAutocompleteChangeNew}
          />
          <br/>
          {showCustomInputNew && (
          <TextField
            label="Nombre de la Universidad"
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            //value={customInstitucion}
            onChange={handleCustomInputChangeNew}
          />
          )}
          <TextField
            name= 'titulo'
            required
            label="Titulo"
            variant="outlined"
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 50 }}
            onChange={inputChange}
          />
          <TextField
            name= 'nivel'
            required
            label="Nivel"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 20 }}
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
            type="number"
          />
          <TextField
            name='campo_estudio'
            required
            label="Campo de estudio"
            inputProps={{ maxLength: 30 }}
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
            inputProps={{ maxLength: 30 }}
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            name='anios_estudio'
            required
            label="Años de estudio"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 20 }}
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
          <Button variant="contained" color="success" onClick={() => {validarFecha();validarNumero();insertarEducacion()} }>Agregar</Button>
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
