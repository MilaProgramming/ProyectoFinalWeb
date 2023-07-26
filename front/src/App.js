import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Inicio from './components/Inicio';
import { AuthProvider } from './contexts/AuthContext';
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
}

export default App;
