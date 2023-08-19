import React, {useState, Component } from "react";
import * as XLSX from 'xlsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios'
import { makeStyles } from '@mui/styles';

const styles = {
    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        '& label': {
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '5px',
        },
        '& input[type="file"]': {
            border: '1px solid #ccc',
            padding: '10px',
            marginTop: '5px',
            marginBottom: '10px',
        },
        '& button': {
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#0056b3',
            },
        },
    },
};
export default class Excel extends Component {


    state = {
        woorksheets: [],
        filas: [],
        propiedades: [],
        status: false,
        body: {
            tipo_documento: '',
            numero_documento: '',
            genero: '',
            estado_civil: '',
            nacionalidad: '',
            etnia: '',
            nombre: '',
            apellido: '',
            ciudad_residencia: '',
            provincia: '',
            direccion: '',
            correo_electronico: '',
            correo_alterno: '',
            tipo_sangre: '',
            numero_telefono: '',
            fecha_nacimiento: '1999-01-01',
            enfermedad_catastrofica: ''
        },     
        
    }

    selectHoja = React.createRef();

    insertarInformacion = () => {
        const id_docente = localStorage.getItem("id_docente");
        axios.get("http://localhost:8000/docentes").then((response) => {
            const docentes = response.data;
            const existe = docentes.some(docente => docente.id_docente === id_docente);
            
            if (existe) {
                alert('Ya existe información cargada en el sistema.');
            } else {
                axios.post(`http://localhost:8000/docentes/${id_docente}`, this.state.body)
                    .then(() => {
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error al insertar información:', error);
                    });
            }
        });
    }
    
    leerFilas = (index) => {
        var hoja = this.state.woorksheets[index];
        var filas = XLSX.utils.sheet_to_row_object_array(hoja.data);
        this.state.filas = [];
        this.state.filas = filas;
        const updatedBody = { ...this.state.body }; // Crear una copia del objeto body actual
    
        for (var i = 0; i < filas.length; i++) {
            if (filas[i].Campos === 'Tipo de documento:') {
                updatedBody.tipo_documento = filas[i].Datos; 
            }
            if (filas[i].Campos === 'Nº de documento:') {
                updatedBody.numero_documento = filas[i].Datos; 
            }
            if (filas[i].Campos === 'Apellidos y Nombres:') {
                const palabras = filas[i].Datos.split(' ');
                if (palabras.length >= 2) {
                    updatedBody.apellido = palabras[0] + ' ' + palabras[1];
                    updatedBody.nombre = palabras.slice(2).join(' ');
                } else if (palabras.length === 1) {
                    updatedBody.apellido = palabras[0];
                    updatedBody.nombre = '';
                }
            }
            if (filas[i].Campos === 'Fecha de nacimiento:') {
                const partes = filas[i].Datos.split('/'); // Dividir la cadena en partes

                // Convertir las partes a números
                const dia = parseInt(partes[0]);
                const mes = parseInt(partes[1]);
                const anio = parseInt(partes[2]);
                console.log(dia,mes,anio)
                // Crear un objeto Date
                const fecha = new Date(anio, mes - 1, dia);
                updatedBody.fecha_nacimiento = fecha; 
            }
            if (filas[i].Campos === 'Género:') {
                updatedBody.genero = filas[i].Datos; 
            }
            if (filas[i].Campos === 'Estado civil:') {
                updatedBody.estado_civil = filas[i].Datos; 
            }
            if (filas[i].Campos === 'Nacionalidad:') {
                updatedBody.nacionalidad = filas[i].Datos; 
            }
            if (filas[i].Campos === 'Auto identificación étnica:') {
                updatedBody.etnia= filas[i].Datos; 
            }
            if (filas[i].Campos === 'Correo electrónico principal:') {
                updatedBody.correo_electronico= filas[i].Datos; 
            }
            if (filas[i].Campos === 'Correo electrónico alternativo:') {
                updatedBody.correo_alterno= filas[i].Datos; 
            }
            if (filas[i].Campos === 'Tipo de sangre:') {
                updatedBody.tipo_sangre= filas[i].Datos; 
            }
            
        }
        
        this.setState({
            body: updatedBody
        }, () => {
            console.log("Estado actualizado:", this.state.body);
        });
    }

    leerPropiedades = (index) => {
        var hoja = this.state.woorksheets[index];
        this.state.propiedades = [];
        for (let key in hoja.data) {
            let regEx = new RegExp("^\(\\w\)\(1\){1}$");
            if (regEx.test(key) == true) {
                this.state.propiedades.push(hoja.data[key].v);
            }
        }

    }

    cambiarHoja = () => {
        this.leerPropiedades(this.selectHoja.current.value);
        this.leerFilas(this.selectHoja.current.value);
        this.setState({
            filas: this.state.filas,
            propiedades: this.state.propiedades
        })
    }

    leerExcel = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        var excel = formData.get("excel");
        var listWorksheet = [];

        var reader = new FileReader()
        reader.readAsArrayBuffer(excel)
        reader.onloadend = (e) => {
            var data = new Uint8Array(e.target.result)
            var excelRead = XLSX.read(data, {type: 'array'})
            excelRead.SheetNames.forEach(function(sheetName, index) {
                listWorksheet.push({
                    data: excelRead.Sheets[sheetName], 
                    name: sheetName, 
                    index: index
                })
            })
            
            this.state.woorksheets = listWorksheet;
            this.setState({
                woorksheets: this.state.woorksheets
            })

            this.leerPropiedades(0);
            this.leerFilas(0);
            this.setState({
                filas: this.state.filas,
                propiedades: this.state.propiedades,
                status: true
            })
        }        
    }
    
    render() {
       
        return (
        <div className="container">
            <h1 className="my-5">Información personal</h1>
            <form onSubmit={this.leerExcel} >
                    <label>Selecciona un archivo excel:</label>
                    <input type={"file"} 
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                        name="excel"
                        />
                    <button variant="contained" color="success" >Subir datos </button>
                </form>
            <hr/>
            {
                this.state.status &&
                <>
                    <form>
                        <label className="form-label">Hojas </label>
                        <select className='form-select' ref={this.selectHoja} onChange={this.cambiarHoja}>
                        {
                            this.state.woorksheets.map((hoja, index) => {
                                return (<option key={index} value={index}>{hoja.name}</option>)
                            })
                        }
                        </select>
                    </form>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                            {
                                this.state.propiedades.map((propiedad, index) => {                                    
                                    return (                                      
                                            <th key={index}>
                                                {propiedad}
                                            </th>                                        
                                    )                                    
                                })
                            }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.filas.map((fila, index1) => {
                                    return (
                                    <tr key={index1}>
                                        {
                                            this.state.propiedades.map((propiedad, index2) => {
                                                return <td>{fila[propiedad]}</td>
                                            })
                                        }
                                    </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>      
                    <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" color="success" onClick={this.insertarInformacion}>Actualizar Datos</Button>
        </Box>          
                </>
                
            }
            
        </div>
        );
    }
}