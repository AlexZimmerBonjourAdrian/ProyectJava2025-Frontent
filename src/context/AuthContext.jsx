import { createContext, useContext, useState, useEffect } from 'react';
import { useDecryptToken } from "../App";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // const payload = JSON.parse(atob(token.split('.')[1]));
        // setIsAdmin(payload.authorities?.includes('ADMIN') || false);
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

      } catch (e) {
        console.error('Token inválido');
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
