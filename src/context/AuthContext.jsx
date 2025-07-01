import { createContext, useContext, useState, useEffect } from 'react';
import { useDecryptToken, encryptToken } from "../App";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [isAdmin, setIsAdmin] = useState(false);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decript = useDecryptToken(token);
        let decoded;
        if(typeof decript === 'string' && decript !== 'null') {
            decoded = JSON.parse(atob(useDecryptToken(token)?.split('.')[1]));
        }
        if (decoded?.authorities?.includes('USER') || decoded?.authorities?.includes('ADMIN')) {
            console.log('User is logged in');
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }

        if (decoded?.authorities?.includes('ADMIN')) {
            console.log('User is admin');
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }

        if(decoded?.nombre){
          setNombre(decoded.nombre);
        } else if(decoded?.sub) {
          setNombre(decoded.sub);
        } else {
          setNombre("");
        }

      } catch (e) {
        console.error('Token inválido');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setNombre("");
      }
    } else {
      setNombre("");
    }
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem('authToken', encryptToken(token));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setNombre("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, nombre, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);