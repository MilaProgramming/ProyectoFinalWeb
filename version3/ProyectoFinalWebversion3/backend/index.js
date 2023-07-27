const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
//rutas
const tareasrutas=require("./routes/tareas.routes");
const app=express();
app.use(cors());

app.use(morgan("dev"))
//para escuchar json
app.use(express.json());
app.use(tareasrutas)
app.use((err,req,res,next)=>{
    return res.json({
        message:err.message
    })
})
//escuchamos express en el puerto 3000

app.listen(4000)
console.log("Server on port 4000")
/*<BrowserRouter>
<Navbar></Navbar>
    <Container>
    <Routes>
      <Route path='/' element={<Tasklist/>}/>
      <Route path='/task/new' element={<Taskform/>}/>

      
    </Routes>
    </Container>
    </BrowserRouter>
    <div>
      <h1>Aplicación con inicio de sesión de Google</h1>
      <GoogleLogin
        clientId="880110465999-0jcqofaekff1idu44905qgteashu9jcm.apps.googleusercontent.com"
        buttonText="Iniciar sesión con Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>*/