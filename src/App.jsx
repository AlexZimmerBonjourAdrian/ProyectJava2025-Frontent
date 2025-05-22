import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route,
  useNavigate,
  Navigate,
  useLocation,
  redirect
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoCurso from './pages/VideoCurso';
import Session11 from './pages/Session11';
import Layout from './components/Layout';
import Paquete from './pages/Paquete';

import Index from './pages/Index';
import PaqueteMenu from './pages/PaqueteMenu';
import CursoMenu from './pages/CursoMenu';
import PaqueteModificar from './pages/PaqueteModificar';
import CursoModificacion from './pages/CursoModificacion';
import Pago from './pages/Pago';
import Carrito from './pages/Carrito';
import Curso from './pages/Curso';
import ListadoProductos from './pages/ListadoProductos';

import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Función para encriptar
export function encryptToken(token) {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
}

// Función para desencriptar
export function decryptToken(encryptedToken) {
  if (!encryptedToken) return null;
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const UserRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  console.log('AA')
  return token ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

// Configurar las rutas con las nuevas banderas
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/session11" element={<Session11 />} />
      <Route path="/Paquete" element={<Paquete />} />
      <Route path="/Curso" element={<UserRoute><Curso /></UserRoute> } />
      <Route path="/productos" element={<ListadoProductos />} />

      <Route path="/VideoCurso" element={<UserRoute><VideoCurso /></UserRoute>} />
      <Route path="/Pago" element={<UserRoute><Pago /></UserRoute>} />
      <Route path="/Carrito" element={<UserRoute><Carrito /></UserRoute>} />

      <Route path="/AgregarPaquete" element={<AdminRoute><PaqueteMenu /></AdminRoute>} />
      <Route path="/AgregarCurso" element={<AdminRoute><CursoMenu /></AdminRoute>} />
      <Route path="/ModificarPaquete" element={<AdminRoute><PaqueteModificar /></AdminRoute>} />
      <Route path="/ModificarCurso" element={<AdminRoute><CursoModificacion /></AdminRoute>} />

    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
