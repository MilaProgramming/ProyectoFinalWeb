// UserProfileCard.js
import { React, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import axios from 'axios';
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



const UserProfileCard = ({ user, countries, roles, tipo_doc }) => {
  const classes = useStyles();
  const [file, setFile] = useState();
  const [body, setBody] = useState({ tipo_documento: '', numero_documento: '', genero: '', estado_civil: '', nacionalidad: '', etnia: '', nombre: '', apellido: '', ciudad_residencia: '', provincia: '', direccion: '', correo_electronico: '', correo_alterno: '', tipo_sangre: '', numero_telefono: '', fecha_nacimiento: '',enfermedad_catastrofica:'' });
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [formularioDatos, setFormularioDatos] = useState(false);
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const minFechaPermitida = '1950-01-01';
  const maxFechaPermitida = '2004-01-01';
  let fechaValida = true;
  let numeroValido = true;
  let correoValido = true;

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append('image', file);
    const id_docente = localStorage.getItem("id_docente");
    axios.post(`http://localhost:8000/upload/${id_docente}`, formdata)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setFormularioVisible(false)
  }
  const insertarInformacion =() =>{  
    if(body.tipo_documento=== ''|| body.numero_documento=== ''|| body.genero=== '', body.estado_civil=== ''|| body.nacionalidad=== ''|| body.etnia=== ''|| body.nombre=== ''|| body.apellido=== ''|| body.ciudad_residencia=== ''|| body.provincia=== ''|| body.direccion=== ''|| body.correo_electronico=== ''|| body.correo_alterno=== '', body.tipo_sangre=== '', body.numero_telefono=== ''||body.enfermedad_catastrofica===''|| fechaValida=== false ||numeroValido===false || correoValido===false ){
      !fechaValida? alert('Fecha inválida'):(!numeroValido ? alert('Número inválido') : (!correoValido ? alert('Correo inválido'):alert('Complete los campos')));
    }else{
    const id_docente=localStorage.getItem("id_docente"); 
    axios.post(`http://localhost:8000/docentes/${id_docente}`, body);
    setFormularioDatos(false);
    window.location.reload();
    
    }
    
  }
  const actualizarDocente = () => {
    if (fechaValida === false || numeroValido === false || correoValido ===false) {
      !fechaValida ? alert('Fecha invalida'): (!correoValido? alert('Correo inválido') : alert('Número inválido '));
    } else {
      const id_docente = localStorage.getItem("id_docente");
      axios.put(`http://localhost:8000/docente/${id_docente}`, body);
      window.location.reload()
    }
  };
  const inputChange = ({ target }) => {
    const { name, value } = target
    if (value === '') {
      alert('Por favor no deje campos en blanco')
    } else {
      setBody({
        ...body,
        [name]: value
      })
    }

  }
  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value === 'checkbox' ? target.checked : target.value
    const name = target.name
    const this2 = this
    
    let hojas = []
    if(name === 'file'){
      let reader = new FileReader()
      reader.readAsArrayBuffer(target.files[0])
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type:'array'});

        workbook.SheetNames.forEach(function(sheetName){
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          }

          )
        })
        console.log(hojas)
        this2.setState({
          selectedFileDocument : target.files[0],
          hojas
        })
      }
    }

  }
  const validarFecha = () => {
    if (body.fecha_nacimiento > maxFechaPermitida || body.fecha_nacimiento < minFechaPermitida) {
      fechaValida = false;
    }
  }
  const asignarDatos = (docente) => {
    for (const prop in docente) {
      if (body[prop] === '') {
        if (['fecha_nacimiento'].includes(prop)) {
          body[prop] = docente[prop].substring(0, 10);
        } else {
          body[prop] = docente[prop];
        }
      }
    }
  }
  const validarNumeros=()=>{
    if(body.numero_telefono.length>10||body.numero_documento.length>10){
      numeroValido=false;
      console.log(body.numero_telefono.length)
      console.log(body.numero_documento.length)

    }
  }
  const validarCorreo = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(body.correo_electronico);
    const isValidEmailAlterno = emailPattern.test(body.correo_alterno);
    if(!isValidEmail || !isValidEmailAlterno){
      correoValido =false;

    }
  }
  useLayoutEffect(() => {
    const id_docente = localStorage.getItem("id_docente");;
    console.log(id_docente);
    axios.get(`http://localhost:8000/docente/${id_docente}`).then((response) => {
      setDocentes(response.data);
      

    });
    if(docentes.length !== 0){ 
      setIsLoading(false);
      setFormularioDatos(false)  ;
    }else{
      setFormularioDatos(true);
    }

  }, []);
  return (
    
    <div className={classes.root}>

      {docentes.length===0 ? (
        <div></div>
      ) : (


        <Grid container sx={{ boxShadow: 5, margin: 2, padding: 1, backgroundColor: "white" }} width="95%" justifyContent="center">
          <Grid item xs={12} sm={3} maxWidth="sm" width="90%" sx={{ padding: 1, textAlign: 'center' }}  >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                className={classes.fotoPerfil}
                alt={user.name}
                src={imagenes(`./${docentes[0].fotografia}`)}
                style={{ width: '50%', height: '20%', objectFit: "cover", objectPosition: 'center top', borderRadius: "10%" }}
              />
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
          </Grid>
          <Grid item xs={12} sm={9} maxWidth="sm" width="90%"
            sx={{ padding: 1 }}  >
            <Typography variant="h5" style={{ padding: '15px' }}>
              {'Bienvenido' + ' ' + docentes[0].nombre + ' ' + docentes[0].apellido}
            </Typography>
          </Grid>

          {/*</div> */}
          <Grid item xs={12} sx={{ padding: 1 }}  >
            {formularioVisible && (
              <>
                <div style={{ margin: '16px' }} />
                <label className={classes.customFile} >
                  SELECCIONAR ARCHIVO
                  <input
                    type="file"
                    onChange={handleFile}
                    style={{ display: 'none' }}
                  />
                </label>
                <Button style={{ marginLeft: "15px" }} variant="contained" color="success" onClick={handleUpload} >Actualizar
                </Button>
              </>
            )}

          </Grid>

        </Grid>


      )}
      {docentes.length===0 ? (
        <div></div>
      ) : (

        <Grid container sx={{ boxShadow: 5, margin: 2, padding: 0, backgroundColor: "white" }} width="95%" justifyContent="center">
          <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >
            <Box sx={{ width: '90%', margin: 'auto' }}>
              <TextField
                label="Nombre"
                name='nombre'
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 50 }}
                defaultValue={docentes[0].nombre}
                onChange={inputChange}
              />

              <TextField
                label="Apellido"
                name='apellido'
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 50 }}
                defaultValue={docentes[0].apellido}
                onChange={inputChange}
              />

              <Typography variant="subtitle1">Tipo de documento:</Typography>


              <Autocomplete
                options={tipo_doc}
                defaultValue={docentes[0].tipo_documento}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => body.tipo_documento = value}
              />

              <TextField
                label="Número de Documento"
                name='numero_documento'
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={docentes[0].numero_documento}
                onChange={inputChange}
                type="number" 
              />


              <Typography variant="subtitle1">Género:</Typography>
              <Autocomplete
                options={['Femenino', 'Masculino', 'Otro', 'Prefiero no decirlo']}
                name='genero'
                defaultValue={docentes[0].genero}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => body.genero = value}

              />

              <Typography variant="subtitle1">Estado Civil:</Typography>
              <Autocomplete
                name='estado_civil'
                options={['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']}
                defaultValue={docentes[0].estado_civil}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => body.estado_civil = value}
              />

              <TextField
                label="Nacionalidad"
                name='nacionalidad'
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 20 }}
                defaultValue={docentes[0].nacionalidad}
                onChange={inputChange}
              />

              <Typography variant="subtitle1">Etnia:</Typography>


              <Autocomplete
                label='etnia'
                name='etnia'
                options={['Indígena(Awá)','Indígena(Chachi)','Indígena(Epera)','Indígena(Tsáchila)', 'Indígena(Ai Cofán)','Indígena(Secoya)','Indígena(Siona)','Indígena(Huaorani)','Indígena(Shiwiar)','Indígena(Zápara)','Indígena(Achuar)','Indígena(Shuar)','Indígena(Kichwa)','Indígena(Pueblo Manta)','Indígena(Pueblo Huancavilca)','Indígena(Pueblo Puná)', 'Mestizo', 'Afroecuatoriano', 'Montubio', 'Blanco']}
                defaultValue={docentes[0].etnia}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => body.etnia = value}

              />
              <Typography variant="subtitle1">Enfermedad Catastrófica:</Typography>

              <Autocomplete
                label='enfermedad'
                name='enfermedad'
                options={['Ninguna', 'Todo tipo de malformaciones congénitas de corazón',
                  "Todo tipo de cáncer", "Insuficiencia renal crónica", "Trasplante de órganos: riñón, hígado, medula ósea",
                  "Secuelas e quemaduras graves", "Malformaciones arterio venosas cerebrales", " Sindrome de klippel trenaunay",
                  "Aneurisma tóraco-abdominal"]}
                defaultValue={docentes[0].enfermedad_catastrofica}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => body.enfermedad_catastrofica = value}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >

            <Box sx={{ width: '90%', margin: 'auto' }}>
              <TextField
                label="Ciudad de Residencia"
                name='ciudad_residencia'
                inputProps={{ maxLength: 30 }}
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={docentes[0].ciudad_residencia}
                onChange={inputChange}
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
                defaultValue={docentes[0].provincia}
                margin="auto"
                fullWidth
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => inputChange({ target: { name: 'provincia', value } })}
              />
              <TextField
                label="Dirección"
                name='direccion'
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 100 }}
                margin="normal"
                defaultValue={docentes[0].direccion}
                onChange={inputChange}
              />
              <TextField
                label="Correo"
                name='correo_electronico'
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 50 }}
                margin="normal"
                defaultValue={docentes[0].correo_electronico}
                onChange={inputChange}
              />
              <TextField
                label="Correo Alterno"
                name='correo_alterno'
                variant="outlined"
                fullWidth
                type='email'
                inputProps={{ maxLength: 50 }}
                margin="normal"
                defaultValue={docentes[0].correo_alterno}
                onChange={inputChange}
              />
              <TextField
                style={{ paddingBottom: "15px" }}
                label="Número de teléfono"
                name='numero_telefono'
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={docentes[0].numero_telefono}
                onChange={inputChange}
                type="number"
              />
              <Typography variant="subtitle1">Tipo de sangre:</Typography>
              <Autocomplete
                options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                name='tipo_sangre'
                defaultValue={docentes[0].tipo_sangre}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => body.tipo_sangre = value}

              />
              <div style={{ margin: '16px' }} />
              <TextField
                style={{ paddingBottom: "15px" }}
                name='fecha_nacimiento'
                label="Fecha nacimiento"
                type="date"
                defaultValue={docentes[0].fecha_nacimiento.substring(0, 10)}
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
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" color="success" onClick={() => { asignarDatos(docentes[0]);validarNumeros();validarCorreo(); validarFecha(); actualizarDocente(); }}>Actualizar Datos</Button>
            </Box>
          </Grid>
        </Grid>


      )}

      {docentes.length===0 ? 
      (
        <div>
        <h1 style={{textAlign: 'center'}}>Ingrese su información:</h1>
      <Grid container sx={{ boxShadow: 5, margin: 2, padding: 0, backgroundColor: "white" }} width="95%" justifyContent="center">
        
      <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >

        <Box sx={{ width: '90%', margin: 'auto' }}>
          <TextField
            label="Nombre"
            name='nombre'
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 50 }}
            margin="normal"
            onChange={inputChange}
          />

          <TextField
            label="Apellido"
            name='apellido'
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 50 }}
            margin="normal"
            onChange={inputChange}
          />

          <Typography variant="subtitle1">Tipo de documento:</Typography>


          <Autocomplete
            options={tipo_doc}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            onChange={(event, value) => body.tipo_documento = value}
          />

          <TextField
            label="Número de Documento"
            name='numero_documento'
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
            type="number"
          />

          <Typography variant="subtitle1">Género:</Typography>
          <Autocomplete
            options={['Femenino', 'Masculino', 'Otro', 'Prefiero no decirlo']}
            name='genero'
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            onChange={(event, value) => body.genero = value}

          />

          <Typography variant="subtitle1">Estado Civil:</Typography>
          <Autocomplete
            name='estado_civil'
            options={['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a']}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            onChange={(event, value) => body.estado_civil = value}
          />

          <TextField
            label="Nacionalidad"
            name='nacionalidad'
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 20 }}
            margin="normal"
            onChange={inputChange}
          />

          <Typography variant="subtitle1">Etnia:</Typography>


          <Autocomplete
            label='etnia'
            name='etnia'
            options={['Indígena(Awá)','Indígena(Chachi)','Indígena(Epera)','Indígena(Tsáchila)', 'Indígena(Ai Cofán)','Indígena(Secoya)','Indígena(Siona)','Indígena(Huaorani)','Indígena(Shiwiar)','Indígena(Zápara)','Indígena(Achuar)','Indígena(Shuar)','Indígena(Kichwa)','Indígena(Pueblo Manta)','Indígena(Pueblo Huancavilca)','Indígena(Pueblo Puná)', 'Mestizo', 'Afroecuatoriano', 'Montubio', 'Blanco']}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            onChange={(event, value) => body.etnia = value}

          />
          <Typography variant="subtitle1">Enfermedad catastrófica:</Typography>
          <Autocomplete
                label='enfermedad'
                name='enfermedad'
                options={['Ninguna', 'Todo tipo de malformaciones congénitas de corazón',
                  "Todo tipo de cáncer", "Insuficiencia renal crónica", "Trasplante de órganos: riñón, hígado, medula ósea",
                  "Secuelas e quemaduras graves", "Malformaciones arterio venosas cerebrales", " Sindrome de klippel trenaunay",
                  "Aneurisma tóraco-abdominal"]}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                onChange={(event, value) => body.enfermedad_catastrofica = value}
              />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} maxWidth="sm" width="100%" sx={{ padding: 1 }}  >

        <Box sx={{ width: '90%', margin: 'auto' }}>
          <TextField
            label="Ciudad de Residencia"
            name='ciudad_residencia'
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 30 }}
            margin="normal"
            onChange={inputChange}
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
          <TextField
            label="Dirección"
            name='direccion'
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 100 }}
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            label="Correo"
            name='correo_electronico'
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 50 }}
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            label="Correo Alterno"
            name='correo_alterno'
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 50 }}
            margin="normal"
            onChange={inputChange}
          />
          <TextField
            style={{ paddingBottom: "15px" }}
            label="Número de teléfono"
            name='numero_telefono'
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={inputChange}
            type="number"
          />
          <Typography variant="subtitle1">Tipo de sangre:</Typography>
          <Autocomplete
            options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
            name='tipo_sangre'
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            onChange={(event, value) => body.tipo_sangre = value}

          />
          <div style={{ margin: '16px' }} />
          <TextField
            style={{ paddingBottom: "15px" }}
            name='fecha_nacimiento'
            label="Fecha nacimiento"
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
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ padding: 1, textAlign: 'center' }}  >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" color="success" onClick={() => { validarNumeros();validarFecha();validarCorreo();insertarInformacion(); }}>Actualizar Datos</Button>
        </Box>
      </Grid>
    </Grid>
    </div>
):null
      }




    </div>

  );
};

export default UserProfileCard;