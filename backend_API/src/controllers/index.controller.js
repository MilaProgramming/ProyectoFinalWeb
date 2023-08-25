const {Pool} = require('pg');


const dbConfig = {
    host:'localhost',
    user: 'postgres',
    password: '1234',
    database: 'hojadevida',
    port: 5433
};

let db = createConnection();

// Función para crear una nueva conexión a la base de datos con un puerto dado
function createConnection() {
    return new Pool({
        ...dbConfig,
        });
}

/*const storage = multer.diskStorage({
  destination: (req,file,cb) => {
      db(null, 'imagenes')
  },
  filename: (req, file, cb) => {
    db(null, file.fieldname + "_" + Date.now()+ path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})*/
const inicio = async (req, res) => {
    console.log('puerto 8000');
  };

//Obtener todos los docentes 
const getDocentes = async (req, res) => {
    const response = await db.query('SELECT * FROM docente');
    res.send(response.rows);
};
//Obtener todas las capacidades especiales por docente 
const getDocenteById = async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM docente WHERE id_docente=$1",[id_docente]);
  res.send(response.rows);

};
//Insertar docente
const createDocente = async (req, res) => {
  const id_docente = req.params.id_docente;
  const { tipo_documento, numero_documento, genero, estado_civil, nacionalidad, etnia, archivo, nombre, apellido, ciudad_residencia, provincia, direccion, correo_electronico, correo_alterno, tipo_sangre, numero_telefono, fecha_nacimiento,enfermedad_catastrofica} = req.body;
  const fotografia ='profile.png';
  const insertQuery = await db.query('INSERT INTO public.docente(id_docente, tipo_documento, numero_documento, genero, estado_civil, nacionalidad, etnia, fotografia, archivo, nombre, apellido, ciudad_residencia, provincia, direccion, correo_electronico, correo_alterno, tipo_sangre, numero_telefono, fecha_nacimiento,enfermedad_catastrofica)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,$20)',
  [id_docente, tipo_documento, numero_documento, genero, estado_civil, nacionalidad, etnia, fotografia, archivo, nombre, apellido, ciudad_residencia, provincia, direccion, correo_electronico, correo_alterno, tipo_sangre, numero_telefono, fecha_nacimiento,enfermedad_catastrofica]);
  res.send("Docente registrado")
};
//Actualizar datos docente
const updateDocente= async (req, res) => {
  const id_docente = req.params.id_docente;
  const {tipo_documento, numero_documento, genero, estado_civil, nacionalidad, etnia, fotografia, archivo, nombre, apellido, ciudad_residencia, provincia, direccion, correo_electronico, correo_alterno, tipo_sangre, numero_telefono, fecha_nacimiento,enfermedad_catastrofica} = req.body;
  const response =await db.query('UPDATE docente SET tipo_documento=$1, numero_documento=$2, genero=$3, estado_civil=$4, nacionalidad=$5, etnia=$6, nombre=$7, apellido=$8, ciudad_residencia=$9, provincia=$10, direccion=$11, correo_electronico=$12, correo_alterno=$13, tipo_sangre=$14, numero_telefono=$15, fecha_nacimiento=$16, enfermedad_catastrofica=$17 WHERE id_docente=$18;', 
  [tipo_documento, numero_documento, genero, estado_civil, nacionalidad, etnia, nombre, apellido, ciudad_residencia, provincia, direccion, correo_electronico, correo_alterno, tipo_sangre, numero_telefono, fecha_nacimiento,enfermedad_catastrofica,id_docente]);
  res.send("Docente actualizado")
};

//Obtener todas las capacidades especiales por docente 
const getCapacidadesEspeciales = async (req, res) => {
    const id_docente = req.params.id_docente;
    const response = await db.query("SELECT * FROM capacidad_especial WHERE doc_id_docente=$1",[id_docente]);
    res.send(response.rows);
  };
//Insertar capacidad especial
const createCapacidadEspecial = async (req, res) => {
  const doc_id_docente = req.params.id_docente;
  const {tipo_capacidad, porcentaje, numero_carnet} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_capacidad) AS max_id FROM capacidad_especial;');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_capacidad = lastId + 1;

  const insertQuery = await db.query('INSERT INTO capacidad_especial(id_capacidad, doc_id_docente, tipo_capacidad, porcentaje, numero_carnet) VALUES ($1,$2,$3,$4,$5)',
  [id_capacidad, doc_id_docente, tipo_capacidad, porcentaje, numero_carnet]);
};
//Actualizar capacidad especial
const updateCapacidadEspecial= async (req, res) => {
    const id_capacidad = req.params.id_capacidad;
    const {tipo_capacidad, porcentaje, numero_carnet} = req.body;
    console.log(id_capacidad,tipo_capacidad, porcentaje, numero_carnet);
    const response =await db.query('UPDATE capacidad_especial SET tipo_capacidad=$1, porcentaje=$2, numero_carnet=$3 WHERE id_capacidad=$4', 
    [tipo_capacidad, porcentaje, numero_carnet,id_capacidad]);
  };
//Eliminar capacidad especial
  const deleteCapacidadEspecial = async (req, res) => {
    const id_capacidad = req.params.id_capacidad;
    await db.query('DELETE FROM capacidad_especial where id_capacidad = $1', [id_capacidad]);
};
  //Obtener todos los contactos de emergencia por docente  
  const getContactosEmergencia = async (req, res) => {
    const id_docente = req.params.id_docente;
    const response = await db.query("SELECT * FROM contacto_emergencia WHERE id_docente=$1",[id_docente]);
    res.send(response.rows);
  };
//Insertar contacto de emergencia
const createContactoEmergencia = async (req, res) => {
  const id_docente = req.params.id_docente;
  const { nombres, apellidos, tipo_documento, numero_documento, parentesco, provincia, canton, parroquia, calle_principal, numero_casa, numero_referencia, telefono_domicilio, telefono_celular} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_contacto) AS max_id FROM contacto_emergencia;');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_contacto = lastId + 1;

  const insertQuery = await db.query('INSERT INTO contacto_emergencia(id_contacto, id_docente, nombres, apellidos, tipo_documento, numero_documento, parentesco, provincia, canton, parroquia, calle_principal, numero_casa, numero_referencia, telefono_domicilio, telefono_celular) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
  [id_contacto, id_docente, nombres, apellidos, tipo_documento, numero_documento, parentesco, provincia, canton, parroquia, calle_principal, numero_casa, numero_referencia, telefono_domicilio, telefono_celular]);
};
//Actualizar contacto de emergencia
const updateContactoEmergencia= async (req, res) => {
    const id_contacto = req.params.id_contacto;
    const {nombres, apellidos, tipo_documento, numero_documento, parentesco, provincia, canton, parroquia, calle_principal, numero_casa, numero_referencia, telefono_domicilio, telefono_celular} = req.body;
  
    const response =await db.query('UPDATE contacto_emergencia SET nombres=$1, apellidos=$2, tipo_documento=$3, numero_documento=$4, parentesco=$5, provincia=$6, canton=$7, parroquia=$8, calle_principal=$9, numero_casa=$10, numero_referencia=$11, telefono_domicilio=$12, telefono_celular=$13 WHERE id_contacto=$14;', 
    [nombres, apellidos, tipo_documento, numero_documento, parentesco, provincia, canton, parroquia, calle_principal, numero_casa, numero_referencia, telefono_domicilio, telefono_celular,id_contacto]);
  };
//Eliminar contacto de emergencia
const deleteContactoEmergencia = async (req, res) => {
  const id_contacto = req.params.id_contacto;
  await db.query('DELETE FROM contacto_emergencia where id_contacto = $1', [id_contacto]);
};
//Obtener todos los cursos por docente  
const getCursos = async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM curso WHERE id_docente=$1",[id_docente]);
      res.send(response.rows);
};  
//Insertar cursos
const createCursos = async (req, res) => {
  const id_docente = req.params.id_docente;
  const {nombre_curso, institucion, pais, anio, fecha_inicial, fecha_final, tipo_certificado, horas} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_curso) AS max_id FROM curso;');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_curso = lastId + 1;

  const insertQuery = await db.query('INSERT INTO curso(id_curso, id_docente, nombre_curso, institucion, pais, anio, fecha_inicial, fecha_final, tipo_certificado, horas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
  [id_curso, id_docente, nombre_curso, institucion, pais, anio, fecha_inicial, fecha_final, tipo_certificado, horas]);
};
//Actualizar curso
const updateCurso= async (req, res) => {
    const id_curso = req.params.id_curso;
    const {nombre_curso, institucion, pais, anio, fecha_inicial, fecha_final, tipo_certificado, horas} = req.body;
  
    const response =await db.query('UPDATE curso SET nombre_curso=$1, institucion=$2, pais=$3, anio=$4, fecha_inicial=$5, fecha_final=$6, tipo_certificado=$7, horas=$8 WHERE id_curso=$9;', 
    [nombre_curso, institucion, pais, anio, fecha_inicial, fecha_final, tipo_certificado, horas,id_curso]);
  };
//Eliminar curso
const deleteCurso = async (req, res) => {
  const id_curso = req.params.id_curso;
  await db.query('DELETE FROM curso where id_curso = $1', [id_curso]);
};
//Obtener la educación del docente  
const getEducacion = async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM educacion WHERE id_docente=$1 ORDER BY id_educacion ASC",[id_docente]);
  res.send(response.rows);
};
//Insertar educacion
const createEducacion = async (req, res) => {
  const id_docente = req.params.id_docente;
  const {institucion, titulo, nivel, numero_senescyt, campo_estudio, fecha_inicio, fecha_graduacion, fecha_registro, pais, anios_estudio} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_educacion) AS max_id FROM educacion;');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_educacion = lastId + 1;

  const insertQuery = await db.query('INSERT INTO educacion(id_educacion, id_docente, institucion, titulo, nivel, numero_senescyt, campo_estudio, fecha_inicio, fecha_graduacion, fecha_registro, pais, anios_estudio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
  [id_educacion, id_docente, institucion, titulo, nivel, numero_senescyt, campo_estudio, fecha_inicio, fecha_graduacion, fecha_registro, pais, anios_estudio]);
};
//Actualizar educacion
const updateEducacion= async (req, res) => {
    const id_educacion = req.params.id_educacion;
    const {institucion, titulo, nivel, numero_senescyt, campo_estudio, fecha_inicio, fecha_graduacion, fecha_registro, pais, anios_estudio} = req.body;
    
    const response =await db.query('UPDATE educacion SET institucion=$1, titulo=$2, nivel=$3, numero_senescyt=$4, campo_estudio=$5, fecha_inicio=$6, fecha_graduacion=$7, fecha_registro=$8, pais=$9, anios_estudio=$10 WHERE id_educacion=$11;', 
    [institucion, titulo, nivel, numero_senescyt, campo_estudio, fecha_inicio, fecha_graduacion, fecha_registro, pais, anios_estudio,id_educacion]);
  };
//Eliminar educacion
const deleteEducacion = async (req, res) => {
  const id_educacion = req.params.id_educacion;
  await db.query('DELETE FROM educacion where id_educacion = $1', [id_educacion]);
};
//Obtener las enfermedades catastróficas por docente  
const getEnfermedadCatastrofica = async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM enfermedad_catastrofica WHERE id_docente=$1",[id_docente]);
  res.send(response.rows);
};
//Insertar enfermedad catastrofica
const createEnfermedadCatastrofica = async (req, res) => {
  const id_docente = req.params.id_docente;
  const { tipo_enfermedad} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_enfermedad) AS max_id FROM enfermedad_catastrofica');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_enfermedad = lastId + 1;

  const insertQuery = await db.query('INSERT INTO enfermedad_catastrofica(id_enfermedad, id_docente, tipo_enfermedad) VALUES ($1, $2, $3)',
  [id_enfermedad, id_docente, tipo_enfermedad]);
};
//Actualizar enfermedad catastrófica
const updateEnfermedadCatastrofica= async (req, res) => {
    const id_enfermedad = req.params.id_enfermedad;
    const {tipo_enfermedad} = req.body;
    const response =await db.query('UPDATE enfermedad_catastrofica SET tipo_enfermedad=$1 WHERE id_enfermedad=$2;', 
    [tipo_enfermedad,id_enfermedad]);
    res.send("Actualizado correctamente");
  };
//Eliminar enfermedad catastrófica
const deleteEnfermedadCatastrofica = async (req, res) => {
  const id_enfermedad = req.params.id_enfermedad;
  await db.query('DELETE FROM enfermedad_catastrofica where id_enfermedad = $1', [id_enfermedad]);
};
//Obtener la experiencia laboral por docente  
const getExperienciaLaboral = async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM experiencia_laboral WHERE id_docente=$1",[id_docente]);
  res.send(response.rows);
};
//Insertar experiencia laboral
const createExperienciaLaboral = async (req, res) => {
  const id_docente = req.params.id_docente;
  const { empresa, unidad_empresa, modalidad_contratacion, motivo_salida, pais, tipo_institucion, puesto, descripcion, fecha_inicio, fecha_fin, provincia} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_exp_lab) AS max_id FROM experiencia_laboral');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_exp_lab = lastId + 1;

  const insertQuery = await db.query('INSERT INTO experiencia_laboral(id_exp_lab, id_docente, empresa, unidad_empresa, modalidad_contratacion, motivo_salida, pais, tipo_institucion, puesto, descripcion, fecha_inicio, fecha_fin, provincia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
  [id_exp_lab, id_docente, empresa, unidad_empresa, modalidad_contratacion, motivo_salida, pais, tipo_institucion, puesto, descripcion, fecha_inicio, fecha_fin, provincia]);
};
//Actualizar experiencia laboral
const updateExperienciaLaboral= async (req, res) => {
    const id_exp_lab = req.params.id_exp_lab;
    const {empresa, unidad_empresa, modalidad_contratacion, motivo_salida, pais, tipo_institucion, puesto, descripcion, fecha_inicio, fecha_fin, provincia} = req.body;
    const response =await db.query('UPDATE experiencia_laboral SET empresa=$1, unidad_empresa=$2, modalidad_contratacion=$3, motivo_salida=$4, pais=$5, tipo_institucion=$6, puesto=$7, descripcion=$8, fecha_inicio=$9, fecha_fin=$10, provincia=$11 WHERE id_exp_lab=$12;', 
    [empresa, unidad_empresa, modalidad_contratacion, motivo_salida, pais, tipo_institucion, puesto, descripcion, fecha_inicio, fecha_fin, provincia,id_exp_lab]);
  };
//Eliminar experiencia laboral
const deleteExperienciaLaboral = async (req, res) => {
  const id_exp_lab = req.params.id_exp_lab;
  await db.query('DELETE FROM experiencia_laboral where id_exp_lab = $1', [id_exp_lab]);
};
//Obtener los idiomas del docente  
const getIdiomas = async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM idioma WHERE id_docente=$1",[id_docente]);
  res.send(response.rows);
};
//Insertar idioma
const createIdioma = async (req, res) => {
  const id_docente = req.params.id_docente;
  const { nombre, porcentaje_hablado, porcentaje_escrito, porcentaje_comprension} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_idioma) AS max_id FROM idioma');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_idioma = lastId + 1;

  const insertQuery = await db.query('INSERT INTO idioma(id_idioma, id_docente, nombre, porcentaje_hablado, porcentaje_escrito, porcentaje_comprension) VALUES ($1, $2, $3, $4, $5, $6)',
  [id_idioma, id_docente, nombre, porcentaje_hablado, porcentaje_escrito, porcentaje_comprension]);
};
//Actualizar idioma
const updateIdioma= async (req, res) => {
    const id_idioma = req.params.id_idioma;
    const {nombre, porcentaje_hablado, porcentaje_escrito, porcentaje_comprension} = req.body;
  
    const response =await db.query('UPDATE idioma  SET nombre=$1, porcentaje_hablado=$2, porcentaje_escrito=$3, porcentaje_comprension=$4 WHERE id_idioma=$5;', 
    [nombre, porcentaje_hablado, porcentaje_escrito, porcentaje_comprension,id_idioma]);
  };
//Eliminar idioma
const deleteIdioma = async (req, res) => {
  const id_idioma = req.params.id_idioma;
  await db.query('DELETE FROM idioma where id_idioma = $1', [id_idioma]);
};
//Obtener la informacion bancaria del docente  
const getInformacionBancaria= async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM informacion_bancaria WHERE id_docente=$1",[id_docente]);
  res.send(response.rows);
};
//Insertar informacion bancaria
const createInformacionBancaria = async (req, res) => {
  const id_docente = req.params.id_docente;
  const {tipo_institucion, nombre_institucion, tipo_cuenta, numero_cuenta} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_inf_bancaria) AS max_id FROM informacion_bancaria');
  const lastId = maxIdQuery.rows[0].max_id;

  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_inf_bancaria = lastId + 1;

  const insertQuery = await db.query('INSERT INTO informacion_bancaria(id_inf_bancaria, id_docente, tipo_institucion, nombre_institucion, tipo_cuenta, numero_cuenta) VALUES ($1, $2, $3, $4, $5, $6)',
  [id_inf_bancaria, id_docente, tipo_institucion, nombre_institucion, tipo_cuenta, numero_cuenta]);
};
//Actualizar informacion bancaria
const updateInformacionBancaria= async (req, res) => {
    const id_inf_bancaria = req.params.id_inf_bancaria;
    const {tipo_institucion, nombre_institucion, tipo_cuenta, numero_cuenta} = req.body;
  
    const response =await db.query('UPDATE informacion_bancaria SET tipo_institucion=$1, nombre_institucion=$2, tipo_cuenta=$3, numero_cuenta=$4 WHERE id_inf_bancaria=$5;', 
    [tipo_institucion, nombre_institucion, tipo_cuenta, numero_cuenta,id_inf_bancaria]);
  };
//Eliminar informacion bancaria
const deleteInformacionBancaria = async (req, res) => {
  const id_inf_bancaria = req.params.id_inf_bancaria;
  await db.query('DELETE FROM informacion_bancaria where id_inf_bancaria = $1', [id_inf_bancaria]);
};
//Obtener las publicaciones del docente  
const getPublicaciones= async (req, res) => {
  const id_docente = req.params.id_docente;
  const response = await db.query("SELECT * FROM publicacion WHERE id_docente=$1",[id_docente]);
  res.send(response.rows);
};
//Insertar publicacion
const createPublicacion = async (req, res) => {
  const id_docente = req.params.id_docente;
  const { autores, publicador, tipo_participacion, idioma, estado_publicacion, numero_volumen, revision_pares, fecha, titulo, tipo, issn, impacto} = req.body;
  const maxIdQuery = await db.query('SELECT MAX(id_publicacion) AS max_id FROM publicacion');
  const lastId = maxIdQuery.rows[0].max_id;
  let boolRevision_pares;
  // Calcular el nuevo ID sumando 1 al último ID obtenido
  const id_publicacion = lastId + 1;
  if(revision_pares==='SI'){
    boolRevision_pares=true;
  }else{
    boolRevision_pares=false;
  }
  const insertQuery = await db.query('INSERT INTO publicacion(id_publicacion, id_docente, autores, publicador, tipo_participacion, idioma, estado_publicacion, numero_volumen, revision_pares, fecha, titulo, tipo, issn, impacto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14)',
  [id_publicacion, id_docente, autores, publicador, tipo_participacion, idioma, estado_publicacion, numero_volumen, boolRevision_pares, fecha, titulo, tipo, issn, impacto]);
};
//Actualizar publicacion
const updatePublicacion= async (req, res) => {
    const id_publicacion = req.params.id_publicacion;
    const {autores, publicador, tipo_participacion, idioma, estado_publicacion, numero_volumen, revision_pares, fecha, titulo, tipo, issn, impacto} = req.body;
    let boolRevision_pares;
    if(revision_pares==='SI'){
      boolRevision_pares=true;
    }else{
      boolRevision_paress=false;
    }
    const response =await db.query('UPDATE publicacion SET autores=$1, publicador=$2, tipo_participacion=$3, idioma=$4, estado_publicacion=$5, numero_volumen=$6, revision_pares=$7, fecha=$8, titulo=$9, tipo=$10, issn=$11, impacto=$12 WHERE id_publicacion=$13;', 
    [autores, publicador, tipo_participacion, idioma, estado_publicacion, numero_volumen, boolRevision_pares, fecha, titulo, tipo, issn, impacto,id_publicacion]);
  };
//Eliminar publicacion
const deletePublicacion = async (req, res) => {
  const id_publicacion = req.params.id_publicacion;
  await db.query('DELETE FROM publicacion where id_publicacion = $1', [id_publicacion]);
};


const getUser= async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Realizar la consulta a la base de datos para verificar las credenciales
    const queryResult = await db.query('SELECT * FROM usuarios WHERE id = $1 AND contrasena= $2', [email, password]);
    if (queryResult.rows.length === 1) {
      // Credenciales válidas
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      // Credenciales inválidas
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}
module.exports = {
    inicio,
    getDocentes,
    getCapacidadesEspeciales,
    getContactosEmergencia,
    getCursos,
    getEducacion,
    getEnfermedadCatastrofica,
    getExperienciaLaboral,
    getIdiomas,
    getInformacionBancaria,
    getPublicaciones,
    createDocente,
    createCapacidadEspecial,
    createContactoEmergencia,
    createCursos,
    createEducacion,
    createEnfermedadCatastrofica,
    createExperienciaLaboral,
    createIdioma,
    createInformacionBancaria,
    createPublicacion,
    updateDocente,
    updateCapacidadEspecial,
    updateContactoEmergencia,
    updateCurso,
    updateEducacion,
    updateEnfermedadCatastrofica,
    updateExperienciaLaboral,
    updateIdioma,
    updateInformacionBancaria,
    updatePublicacion,
    deleteCapacidadEspecial,
    deleteContactoEmergencia,
    deleteCurso,
    deleteEducacion,
    deleteEnfermedadCatastrofica,
    deleteExperienciaLaboral,
    deleteIdioma,
    deleteInformacionBancaria,
    deletePublicacion,
    getUser,
    getDocenteById
};