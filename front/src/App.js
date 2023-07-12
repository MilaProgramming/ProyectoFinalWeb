import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from "./pages/HomePage";
import Login from './pages/Login';
import Products from './pages/Products';

const router = createBrowserRouter([
  { path: '/', element: <Login/> },
  { path: '/homePage', element: <Home/>},
  { path: '/productos', element: <Products/>},
]);

function App() {
  return <RouterProvider router = {router} />
}

export default App;
