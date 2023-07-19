import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from "./pages/HomePage";
import Login from './pages/Login';

const router = createBrowserRouter([
  { path: '/', element: <Login/> },
  { path: '/homePage', element: <Home/>},
]);

function App() {
  return <RouterProvider router = {router} />
}

export default App;
