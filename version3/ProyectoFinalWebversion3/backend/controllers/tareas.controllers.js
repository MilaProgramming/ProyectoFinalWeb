//llamamos al archivo basededatos.js
const pool = require("../basededatos")
const getAllTareas = async (req, res,next) => {
    try {
        const allTareas = await pool.query("select * from usuarios");
        res.json(allTareas.rows);
    } catch (error) {
        next(error);
    }   
}
const getTarea = async (req, res,next) => {
    try {
        const{id}=req.params
    const result= await pool.query("select * from tarea where id=$1",[id]);
    console.log(result)
    if(result.rows.length===0)return res.status(404).json({
        message:"Tarea no encontrada"
    })
    res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
    
}
const getUsuario = async (req, res,next) => {
    try {
        const{id}=req.params
    const result= await pool.query("select * from usuarios where id=$1",[id]);
    console.log(result)
    if(result.rows.length===0)return res.status(404).json({
        message:"Tarea no encontrada"
    })
    res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
    
}
const createTarea = async (req, res,next) => {
    const { titulo, descripcion } = req.body
    try {
        const result = await pool.query("INSERT INTO tarea (titulo,descripcion) VALUES($1,$2) RETURNING *", [titulo, descripcion]);
        res.json(result.rows[0])

    } catch (error) {
        next(error);
    }
    res.send("creando datos");
}
const deleteTarea = async(req, res,next) => {
    try {
        const{id}=req.params
    const result= await pool.query("delete from tarea where id=$1",[id]);
    console.log(result)
    if(result.rows.length===0)return res.status(404).json({
        message:"Tarea no encontrada"
    })
    res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}
const updateTarea = async(req, res,next) => {
    try {
        const{id}=req.params
        const{titulo,descripcion}=req.body
        console.log(id,titulo,descripcion)
    const result= await pool.query("update tarea set titulo=$1,descripcion=$2 where id=$3 returning*",[titulo,descripcion,id]);
    console.log(result)
    
    if(result.rows.length===0)return res.status(404).json({
        message:"Tarea no encontrada"
    })
    return res.json(result.rows[0])
    res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}
const getUser= async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Realizar la consulta a la base de datos para verificar las credenciales
      const queryResult = await pool.query('SELECT * FROM usuarios WHERE id = $1 AND contrasena= $2', [email, password]);
  
      if (queryResult.rows.length === 1) {
        // Credenciales válidas
        res.json(queryResult.rows[0]);
        //res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Credenciales inválidas
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
    } catch (error) {
      console.error('Error en la consulta:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
//se exporta de manera modularizada
module.exports = {
    getAllTareas,
    getTarea, createTarea, deleteTarea, updateTarea,getUsuario,getUser
}