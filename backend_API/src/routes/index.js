const { Router } = require('express');
const router = Router();

const { getDocentes,createDocente,updateDocente,getDocenteById} = require('../controllers/index.controller');
const { getCapacidadesEspeciales,createCapacidadEspecial,updateCapacidadEspecial,deleteCapacidadEspecial} = require('../controllers/index.controller');
const { getContactosEmergencia,createContactoEmergencia,updateContactoEmergencia,deleteContactoEmergencia} = require('../controllers/index.controller');
const { getCursos,createCursos,updateCurso,deleteCurso} = require('../controllers/index.controller');
const { getEducacion,createEducacion,updateEducacion,deleteEducacion} = require('../controllers/index.controller');
const { getEnfermedadCatastrofica,createEnfermedadCatastrofica,updateEnfermedadCatastrofica,deleteEnfermedadCatastrofica} = require('../controllers/index.controller');
const { getExperienciaLaboral,createExperienciaLaboral,updateExperienciaLaboral,deleteExperienciaLaboral} = require('../controllers/index.controller');
const { getIdiomas,createIdioma,updateIdioma,deleteIdioma} = require('../controllers/index.controller');
const { getInformacionBancaria,createInformacionBancaria,updateInformacionBancaria,deleteInformacionBancaria} = require('../controllers/index.controller');
const { getPublicaciones,createPublicacion,updatePublicacion,deletePublicacion,getUser} = require('../controllers/index.controller');

//GET
router.get('/docentes', getDocentes);
router.get('/docente/:id_docente', getDocenteById);
router.get('/capacidades_especiales/:id_docente', getCapacidadesEspeciales);
router.get('/contactos_emergencia/:id_docente', getContactosEmergencia);
router.get('/cursos/:id_docente', getCursos);
router.get('/educacion/:id_docente', getEducacion);
router.get('/enfermedades_catastroficas/:id_docente', getEnfermedadCatastrofica);
router.get('/experiencia_laboral/:id_docente', getExperienciaLaboral);
router.get('/idiomas/:id_docente', getIdiomas);
router.get('/informacion_bancaria/:id_docente', getInformacionBancaria);
router.get('/publicaciones/:id_docente', getPublicaciones);
//POST
router.post('/docentes', createDocente);
router.post('/capacidades_especiales', createCapacidadEspecial);
router.post('/contactos_emergencia', createContactoEmergencia);
router.post('/cursos', createCursos);
router.post('/educacion/:id_docente', createEducacion);
router.post('/enfermedad_catastrofica', createEnfermedadCatastrofica);
router.post('/experiencia_laboral',createExperienciaLaboral);
router.post('/idioma',createIdioma);
router.post('/informacion_bancaria',createInformacionBancaria);
router.post('/publicacion',createPublicacion);
router.post('/api/login', getUser);
//PUT
router.put('/docente/:id_docente', updateDocente);
router.put('/capacidad_especial/:id_capacidad', updateCapacidadEspecial);
router.put('/capacidad_especial/:id_contacto', updateContactoEmergencia);
router.put('/curso/:id_curso', updateCurso);
router.put('/educacion/:id_educacion', updateEducacion);
router.put('/enfermedad_catastrofica/:id_enfermedad', updateEnfermedadCatastrofica);
router.put('/experiencia_laboral/:id_exp_lab', updateExperienciaLaboral);
router.put('/idioma/:id_idioma', updateIdioma);
router.put('/informacion_bancaria/:id_inf_bancaria', updateInformacionBancaria);
router.put('/publicacion/:id_publicacion', updatePublicacion);

//DELETE
router.delete('/capacidad_especial/:id_capacidad', deleteCapacidadEspecial);
router.delete('/contacto_emergencia/:id_contacto', deleteContactoEmergencia);
router.delete('/curso/:id_curso', deleteCurso);
router.delete('/educacion/:id_educacion', deleteEducacion);
router.delete('/enfermedad_catastrofica/:id_enfermedad', deleteEnfermedadCatastrofica);
router.delete('/experiencia_laboral/:id_exp_lab', deleteExperienciaLaboral);
router.delete('/idioma/:id_idioma', deleteIdioma);
router.delete('/informacion_bancaria/:id_inf_bancaria', deleteInformacionBancaria);
router.delete('/publicacion/:id_publicacion', deletePublicacion);

module.exports = router;