import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Inicio from './components/Inicio';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter([
  { path: '/', element: <Login/> },
  { path: '/Inicio', element: <Inicio/> },
]);

function App() {
  
  return (<AuthProvider><RouterProvider router = {router} />
  </AuthProvider> );
  
}

export default App;
