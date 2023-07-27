const{Pool}=require("pg")
const{db}= require('./config')
const pool=new Pool({
    //ponemos usuario contraseña de la db
    /*DB_USER=postgres
DB_PASSWORD=tarabita2
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=cardell*/
    user:"postgres",
    password:"tarabita2",
    host:"localhost",
    port:5432,
    database:"Usuarios"
})
module.exports =pool;