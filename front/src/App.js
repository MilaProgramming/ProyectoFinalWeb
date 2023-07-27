import './App.css';
import Login from './pages/Login';
import PersonalDataDisplay from './pages/PersonalDataDisplay';
import Inicio from './pages/Inicio';
import { AuthProvider } from './contexts/AuthContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  { path: '/', element: <Login/> },
  { path: '/Inicio', element: <Inicio/> },
  { path: '/Personal', element: <PersonalDataDisplay/> },
  
]);
function App()  {
  return (<AuthProvider><RouterProvider router = {router} />
</AuthProvider> );
}
export default App;



