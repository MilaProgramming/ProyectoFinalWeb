import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
<<<<<<< HEAD
import Inicio from './components/Inicio';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter([
  { path: '/', element: <Login/> },
  { path: '/Inicio', element: <Inicio/> },
]);

function App() {
  
  return (<AuthProvider><RouterProvider router = {router} />
  </AuthProvider> );
  
=======
import CV from './pages/cv';

function App() {
  //return <RouterProvider router = {router} />;
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/cv" element={<CV />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
>>>>>>> 1200a1c7296c2c093f9bdf0abdb3fca9cbf09164
}

export default App;
