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
import { PrimeReactProvider } from 'primereact/api';
import { primeReactConfig } from './utils/primeReactConfig';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoCurso from './pages/VideoCurso';
import Session11 from './pages/Session11';
import Layout from './components/Layout';
import Paquete from './pages/Paquete';

import PaqueteMenu from './pages/PaqueteMenu';
import CursoMenu from './pages/CursoMenu';
import PaqueteModificar from './pages/PaqueteModificar';
import CursoModificacion from './pages/CursoModificacion';
import Pago from './pages/Pago';
import PagoPaypal from './pages/PagoPaypal';
import Carrito from './pages/Carrito';
import Curso from './pages/Curso';
import ListadoProductos from './pages/ListadoProductos';
import { AuthProvider } from './context/AuthContext';
import MisCursos from './pages/MisCursos';
import VentaCurso from './pages/VentaCurso';

import CryptoJS, { enc } from 'crypto-js';
import PagoMercadoPago from './pages/PagoMercadoPago';
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || 'clave-secreta-123';

// Función para encriptar
export function encryptToken(token) {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  return encrypted;
}

// Función para desencriptar
export function useDecryptToken(encryptedToken) {
  if(!encryptedToken || encryptedToken === 'null') {
    return null;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    if (!originalToken) { // Si la desencriptación resulta en una cadena vacía
        console.error("Error al desencriptar el token: resultado vacío");
        return null;
    }
    return originalToken;
  } catch (error) {
      console.error("Error al desencriptar el token:", error);
      return null; // Retorna null en caso de error de desencriptación
  }
}

const UserRoute = ({ children }) => {
  const location = useLocation?.();
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" state={{ from: location?.pathname }} replace />;
};

const AdminRoute = ({ children }) => {
  const location = useLocation?.();
  const token = localStorage.getItem('authToken');
  const decrypted = useDecryptToken(token);
  let isAdmin = false;
  if (typeof decrypted === 'string' && decrypted.split('.').length === 3) {
    try {
      const decoded = JSON.parse(atob(decrypted.split('.')[1]));
      isAdmin = decoded.authorities && decoded.authorities.includes('ADMIN');
    } catch (e) {
      isAdmin = false;
    }
  }
  return isAdmin ? children : <Navigate to="/login" state={{ from: location?.pathname }} replace />;
};

// Configurar las rutas con las nuevas banderas
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/session11" element={<Session11 />} />
      <Route path="/Paquete" element={<Paquete />} />
      <Route path="/curso/:id" element={<Curso />} />
      <Route path="/Curso" element={<Curso />} />
      <Route path="/productos" element={<ListadoProductos />} />

      <Route path="/VideoCurso" element={<UserRoute><VideoCurso /></UserRoute>} />
      <Route path="/resumen-pago" element={<UserRoute><Pago /></UserRoute>} />
      <Route path="/pago-paypal" element={<UserRoute><PagoPaypal /></UserRoute>} />
      <Route path="/pago-mercado-pago" element={<UserRoute><PagoMercadoPago /></UserRoute>} />
      <Route path="/Carrito" element={<UserRoute><Carrito /></UserRoute>} />
      <Route path="/MisCursos" element={<UserRoute><MisCursos /></UserRoute>} />

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
  return (
    <PrimeReactProvider value={primeReactConfig}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
