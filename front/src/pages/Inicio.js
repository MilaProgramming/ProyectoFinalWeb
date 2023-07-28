import React, { useState } from 'react';
import {Typography, Container, TextField, Button } from '@mui/material';
import Navbar from '../components/NavBar';
import "../styles/Inicio.css"

const CurriculumVitae = () => {
  const [idDocente, setIdDocente] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  // ... Define el estado para el resto de los campos

  const handleSaveChanges = () => {
    // Lógica para guardar cambios...
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" gutterBottom>
          Curriculum Vitae
        </Typography>
        <form >
          <div >
            <label htmlFor="idDocente">ID Docente:</label>
            <TextField
              type="text"
              id="idDocente"
              value={idDocente}
              onChange={(e) => setIdDocente(e.target.value)}
            />
          </div>
          <div >
            <label htmlFor="tipoDocumento">Tipo de documento:</label>
            <TextField
              type="text"
              id="tipoDocumento"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            />
          </div>
          <div >
            <label htmlFor="numeroDocumento">Número de documento:</label>
            <TextField
              type="text"
              id="numeroDocumento"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
            />
          </div>
          {/* ... Repite el bloque de código para los demás campos del formulario */}
          <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CurriculumVitae;
