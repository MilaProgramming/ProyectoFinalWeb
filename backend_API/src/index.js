
const path = require('path');
const multer = require('multer');
const express = require('express');
const {Pool} = require('pg');

const app = express();
const PORT = 8000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use(require('./routes/index'));


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

const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,"./src/images");
  },
  filename:(req,file,callback)=>{
      callback(null,`image-${Date.now()}.${file.originalname}`)
  }
});

const upload = multer({
storage: storage
})

app.post('/upload/:id_docente',upload.single('image'), (req,res) => {
  let image = req.file.filename;
  const id_docente = req.params.id_docente;
  const sql = "UPDATE docente SET fotografia=$1 WHERE id_docente=$2";
    db.query(sql,[image,id_docente],(err,result) =>{
    if(err) return res.json({Message: "Error"});
    return res.json({Status: "Success"});
  } )
}

)
app.use('/images', express.static(path.join(__dirname, './src/images')));



const inicio = async (req, res) => {
  console.log('puerto 8000');
};

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});