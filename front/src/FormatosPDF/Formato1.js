import React, { useState, useLayoutEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import axios from 'axios';

const imagenes = require.context('../../../backend_API/src/images', true);

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    borderLine: {
      position: 'absolute',
      top: '1cm',
      bottom: '1cm',
      left: '1cm',
      right: '1cm',
      border: '1px solid black',
    },
    section: {
      margin: 25,
      padding: 25,
      paddingBottom: 25,
      flexGrow: 1,
      fontFamily: 'Helvetica',
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight:900
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
      marginBottom: 3,
    },
    image: {
      width: 150,
      height: 100,
      marginBottom: 10,
      alignSelf: 'center',
    },
  });

const Formato1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [docentes, setDocentes] = useState([]);
  const [educacion,setEducacion] =useState([]);
  const [capacidades,setCapacidades] = useState([]);
  const [infBancaria,setInfBancaria] = useState([]);
  const [expLaboral, setExpLaboral] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [idiomas, setIdiomas] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [cursos, setCursos] = useState([]);


  useLayoutEffect(() => {
    const id_docente = localStorage.getItem("id_docente");
    console.log(id_docente);
    axios.get(`http://localhost:8000/docente/${id_docente}`).then((response) => {
      setDocentes(response.data);
      setIsLoading(true); // Se establece isLoading en falso una vez que se obtienen los datos.
    });
    axios.get(`http://localhost:8000/educacion/${id_docente}`).then((response) => {
      setEducacion(response.data);

    });
    axios.get(`http://localhost:8000/capacidades_especiales/${id_docente}`).then((response) => {
      setCapacidades(response.data);   
    });
    axios.get(`http://localhost:8000/informacion_bancaria/${id_docente}`).then((response) => {
      setInfBancaria(response.data);   
    });
    axios.get(`http://localhost:8000/experiencia_laboral/${id_docente}`).then((response) => {
      setExpLaboral(response.data);
    });
    axios.get(`http://localhost:8000/contactos_emergencia/${id_docente}`).then((response) => {
      setContactos(response.data);
    });
    axios.get(`http://localhost:8000/idiomas/${id_docente}`).then((response) => {
      setIdiomas(response.data);
    });
    axios.get(`http://localhost:8000/publicaciones/${id_docente}`).then((response) => {
      setPublicaciones(response.data);
    });
    axios.get(`http://localhost:8000/cursos/${id_docente}`).then((response) => {
      setCursos(response.data);
    });
  }, []);


  return (
    <>
      {isLoading ? (
        <Document>
          <Page size="A4" style={styles.page}>
              <View style={styles.section}>
              {docentes.length > 0 && (
                <>
                  <Text style={styles.title}>Hoja de Vida</Text>
                  <Image
                    src={imagenes(`./${docentes[0].fotografia}`)}
                    style={styles.image}
                  />
                  <Text style={styles.subtitle}>Datos Personales</Text>
                  <Text> </Text> 
                  <Text style={styles.text}>Nombre: {docentes[0].nombre}</Text>
                  <Text style={styles.text}>Apellido: {docentes[0].apellido}</Text>
                  <Text style={styles.text}>Ciudad residencia: {docentes[0].ciudad_residencia}</Text>
                  <Text style={styles.text}>Tipo de documento: {docentes[0].tipo_documento}</Text>
                  <Text style={styles.text}>Número de documento: {docentes[0].numero_documento}</Text>
                  <Text style={styles.text}>Género: {docentes[0].genero}</Text>
                  <Text style={styles.text}>Estado civil: {docentes[0].estado_civil}</Text>
                  <Text style={styles.text}>Nacionalidad: {docentes[0].nacionalidad}</Text>
                  <Text style={styles.text}>Etnia: {docentes[0].etnia}</Text>
                  <Text style={styles.subtitle}>Información de Contacto</Text>
                  <Text style={styles.text}>Provincia: {docentes[0].provincia}</Text>
                  <Text style={styles.text}>Dirección: {docentes[0].direccion}</Text>
                  <Text style={styles.text}>Correo electrónico: {docentes[0].correo_electronico}</Text>
                  <Text style={styles.text}>Correo alternativo: {docentes[0].correo_alterno}</Text>
                  <Text style={styles.text}>Número de teléfono: {docentes[0].numero_telefono}</Text>
                  <Text style={styles.subtitle}>Datos Médicos</Text>
                  <Text style={styles.text}>Tipo de sangre: {docentes[0].tipo_sangre}</Text>
                  <Text style={styles.text}>Fecha de nacimiento: {docentes[0].fecha_nacimiento.substring(0, 10)}</Text>
                  <Text> </Text> 
                </>
              )}
              {educacion.length>0 &&(
                <>
                <Text> </Text> 
                <Text style={styles.subtitle}>Informacion Académica</Text>
                {educacion.map((educacion) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}></Text>
                <Text style={styles.text}> Institución: {educacion.institucion}</Text>
                <Text style={styles.text}> Título: {educacion.titulo}</Text>
                <Text style={styles.text}> Nivel: {educacion.nivel}</Text>
                <Text style={styles.text}> Número SENESCYT: {educacion.numero_senescyt}</Text>
                <Text style={styles.text}> Campo de Estudio: {educacion.campo_estudio}</Text>
                <Text style={styles.text}> Fecha de Inicio: {educacion.fecha_inicio.substring(0,10)}</Text>
                <Text style={styles.text}> Fecha de Graduación: {educacion.fecha_graduacion.substring(0,10)}</Text>
                <Text style={styles.text}> Fecha de Registro: {educacion.fecha_registro.substring(0,10)}</Text>
                <Text style={styles.text}> País: {educacion.pais}</Text>
                <Text style={styles.text}> Años de Estudio: {educacion.anios_estudio}</Text>
                <Text> </Text>    
                </>
                )})} 
                </>)
              }
              {capacidades.length>0 &&(
                <>
                <Text style={styles.subtitle}>Capacidades especiales:</Text>
                {capacidades.map((capacidad) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}> Tipo capacidad: {capacidad.tipo_capacidad}</Text>
                <Text style={styles.text}> Porcentaje: {capacidad.porcentaje}</Text>
                <Text style={styles.text}> Numero Carnet: {capacidad.numero_carnet}</Text>      
                <Text> </Text> 
                </>
                )})} 
                </>)
              }
              {infBancaria.length>0 &&(
                <>
                <Text style={styles.subtitle}>Información bancaria:</Text>
                {infBancaria.map((informacion) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}> Tipo de institución: {informacion.tipo_institucion}</Text>
                <Text style={styles.text}> Nombre de la institución: {informacion.nombre_institucion}</Text>
                <Text style={styles.text}> Tipo de cuenta: {informacion.tipo_cuenta}</Text>  
                <Text style={styles.text}> Numero de cuenta: {informacion.numero_cuenta}</Text>  
                <Text> </Text>   
                </>
                )})} 
                
                </>)
              }
              {expLaboral.length>0 &&(
                <>
                <Text style={styles.subtitle}>Experiencia laboral:</Text>
                {expLaboral.map((experiencia) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}> Empresa: {experiencia.empresa}</Text>
                <Text style={styles.text}>  Unidad de la empresa: {experiencia.unidad_empresa}</Text>
                <Text style={styles.text}>  Modalidad de contratación: {experiencia.modalidad_contratacion}</Text>
                <Text style={styles.text}>  Motivo de salida: {experiencia.motivo_salida}</Text>
                <Text style={styles.text}>  País: {experiencia.pais}</Text>
                <Text style={styles.text}>  Tipo de institución: {experiencia.tipo_institucion}</Text>
                <Text style={styles.text}>  Puesto: {experiencia.puesto}</Text>
                <Text style={styles.text}>  Descripción: {experiencia.descripcion}</Text>
                <Text style={styles.text}>  Fecha de inicio: {experiencia.fecha_inicio.substring(0,10)}</Text>
                <Text style={styles.text}>  Fecha de fin: {experiencia.fecha_fin.substring(0,10)}</Text>
                <Text style={styles.text}>  Provincia: {experiencia.provincia}</Text>
                <Text> </Text> 
                </>
                )})} 
                
                </>)
              }
              {contactos.length>0 &&(
                <>
                <Text style={styles.subtitle}>Contacto de emergencia:</Text>
                {contactos.map((contacto) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}> Nombres: {contacto.nombres}</Text>
                <Text style={styles.text}>  Apellidos: {contacto.apellidos}</Text>
                <Text style={styles.text}>  Tipo de documento: {contacto.tipo_documento}</Text>
                <Text style={styles.text}>  Número de documento: {contacto.numero_documento}</Text>
                <Text style={styles.text}>  Parentesco: {contacto.parentesco}</Text>
                <Text style={styles.text}>  Provincia: {contacto.provincia}</Text>
                <Text style={styles.text}>  Cantón: {contacto.canton}</Text>
                <Text style={styles.text}>  Parroquia: {contacto.parroquia}</Text>
                <Text style={styles.text}>  Calle principal: {contacto.calle_principal}</Text>
                <Text style={styles.text}>  Número de casa: {contacto.numero_casa}</Text>
                <Text style={styles.text}>  Número de referencia: {contacto.numero_referencia}</Text>
                <Text style={styles.text}>  Teléfono domicilio: {contacto.telefono_domicilio}</Text>
                <Text style={styles.text}>  Teléfono celular: {contacto.telefono_celular}</Text>
                <Text> </Text>
                </>
                )})} 
                
                </>)
              }
              {idiomas.length>0 &&(
                <>
                <Text style={styles.subtitle}>Idiomas:</Text>
                {idiomas.map((idioma) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}> Idioma: {idioma.nombre}</Text>
                <Text style={styles.text}>Porcentaje hablado: {idioma.porcentaje_hablado}</Text>
                <Text style={styles.text}>Porcentaje escrito: {idioma.porcentaje_escrito}</Text>
                <Text style={styles.text}>Porcentaje comprension: {idioma.porcentaje_comprension}</Text>
                <Text> </Text>
                </>
                )})} 
                
                </>)
              }
              {publicaciones.length>0 &&(
                <>
                <Text style={styles.subtitle}>Publicaciones:</Text>
                {publicaciones.map((publicacion) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}> Autores: {publicacion.autores}</Text>
                <Text style={styles.text}>  Publicador: {publicacion.publicador}</Text>
                <Text style={styles.text}>  Tipo de participación: {publicacion.tipo_participacion}</Text>
                <Text style={styles.text}>  Idioma: {publicacion.idioma}</Text>
                <Text style={styles.text}>  Estado de la publicación: {publicacion.estado_publicacion}</Text>
                <Text style={styles.text}>  Número de volumen: {publicacion.numero_volumen}</Text>
                <Text style={styles.text}>  Revisión por pares: {publicacion.revision_pares ? 'Sí' : 'No'}</Text>
                <Text style={styles.text}>  Fecha: {publicacion.fecha.substring(0,10)}</Text>
                <Text style={styles.text}>  Título: {publicacion.titulo}</Text>
                <Text style={styles.text}>  Tipo: {publicacion.tipo}</Text>
                <Text style={styles.text}>  ISSN: {publicacion.issn}</Text>
                <Text style={styles.text}>  Impacto: {publicacion.impacto}</Text>
                <Text> </Text>
                </>
                )})} 
                
                </>)
              }
              {cursos.length>0 &&(
                <>
                <Text style={styles.subtitle}>Cursos:</Text>
                {cursos.map((curso) => {
                    return (
                <>
                <Text> </Text> 
                <Text style={styles.text}> Nombre del curso: {curso.nombre_curso}</Text>
                <Text style={styles.text}>  Institución: {curso.institucion}</Text>
                <Text style={styles.text}>  País: {curso.pais}</Text>
                <Text style={styles.text}>  Año: {curso.anio}</Text>
                <Text style={styles.text}>  Fecha inicial: {curso.fecha_inicial.substring(0,10)}</Text>
                <Text style={styles.text}>  Fecha final: {curso.fecha_final.substring(0,10)}</Text>
                <Text style={styles.text}>  Tipo de certificado: {curso.tipo_certificado}</Text>
                <Text style={styles.text}>  Horas: {curso.horas}</Text>
                <Text> </Text>

                </>
                )})} 
                
                </>)
              }
            </View>
          </Page>
        </Document>
      ) : null}
    </>
  );
};

export default Formato1;
