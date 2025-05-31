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
import MisCursos from './pages/MisCursos';
import VentaCurso from './pages/VentaCurso';

import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Función para encriptar
export function encryptToken(token) {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
}

// Función para desencriptar (solo desencripta, la lógica de redirección se mueve a useAuth)
export function useDecryptToken(encryptedToken) {
  if(!encryptedToken) {
    return null; // Retorna null si no hay token encriptado
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
  const token = localStorage.getItem('authToken');
  const location = useLocation(); // Obtener location aquí
  // La lógica de validación y redirección se moverá al componente que usa el token o a un hook de autenticación
   // Por ahora, solo verificamos si hay token para la navegación básica de rutas privadas
  return token ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
   const location = useLocation(); // Obtener location aquí
  console.log('Eres Admin?')
  // La lógica de validación y redirección se moverá al componente que usa el token o a un hook de autenticación
  // Por ahora, solo verificamos si hay token para la navegación básica de rutas privadas
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
      <Route path="/curso/:id" element={<UserRoute><Curso /></UserRoute>} />
      <Route path="/Curso" element={<UserRoute><Curso /></UserRoute> } />
      <Route path="/productos" element={<UserRoute><ListadoProductos /></UserRoute>} />

      <Route path="/VideoCurso" element={<UserRoute><VideoCurso /></UserRoute>} />
      <Route path="/Pago" element={<UserRoute><Pago /></UserRoute>} />
      <Route path="/Carrito" element={<UserRoute><Carrito /></UserRoute>} />

      <Route path="/AgregarPaquete" element={<AdminRoute><PaqueteMenu /></AdminRoute>} />
      <Route path="/AgregarCurso" element={<AdminRoute><CursoMenu /></AdminRoute>} />
      <Route path="/ModificarPaquete" element={<AdminRoute><PaqueteModificar /></AdminRoute>} />
      <Route path="/ModificarCurso" element={<AdminRoute><CursoModificacion /></AdminRoute>} />
      <Route path="/MisCursos" element={<UserRoute><MisCursos /></UserRoute>} />
    
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
