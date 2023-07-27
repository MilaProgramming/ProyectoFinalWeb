const { Router } = require("express");
const router = Router();
const { getAllTareas, getTarea, createTarea, deleteTarea, updateTarea,getUsuario,getUser } = require("../controllers/tareas.controllers")
//lalamamos a la base de datos

//colocamos las nuevas url
router.get("/", (req, res) => {
    res.send("hello world");
}
)
router.get("/usuarios/:id",getUsuario)

router.get("/tareas", getAllTareas)
//ruta para crear datos
router.post("/tareas", createTarea
)
//eliminar
router.delete("/tareas/:id", deleteTarea
)
//actualizando
router.put("/tareas/:id", updateTarea
)
//retirnando una sola tarea
router.get("/tareas/:id", getTarea)
router.post('/api/login', getUser);
module.exports = router;