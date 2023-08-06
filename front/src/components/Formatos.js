
import React from 'react';
import Formato1 from '../FormatosPDF/Formato1';
import { PDFViewer } from '@react-pdf/renderer';

const Formatos = () => (
  <div>
    <h1>Formato General:</h1>
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      <Formato1 />
    </PDFViewer>
  </div>
);

export default Formatos;
