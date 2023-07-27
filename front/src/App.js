import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

import Curriculum from './pages/cv';
import PersonalDataDisplay from './pages/PersonalDataDisplay';
import Inicio from './components/Inicio';
import { AuthProvider } from './contexts/AuthContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  { path: '/', element: <Login/> },
  { path: '/Inicio', element: <Inicio/> },
  { path: '/Personal', element: <PersonalDataDisplay/> },
  
]);
function App()  
 
{ return (<AuthProvider><RouterProvider router = {router} />
</AuthProvider> );
}
