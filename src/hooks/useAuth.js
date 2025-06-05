import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';

// Function to decrypt token
const decryptToken = (encryptedToken) => {
  if(!encryptedToken || encryptedToken === 'null') {
    return null;
  }
  try {
    const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    if (!originalToken) {
      console.error("Error al desencriptar el token: resultado vacío");
      return null;
    }
    return originalToken;
  } catch (error) {
    console.error("Error al desencriptar el token:", error);
    return null;
  }
};

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const encryptedToken = localStorage.getItem('authToken');
                if (!encryptedToken) {
                    // No token found, set loading to false but don't redirect
                    setIsLoading(false);
                    return;
                }
                
                const decryptedToken = decryptToken(encryptedToken);
                if (!decryptedToken) {
                    // Token found but decryption failed, clear token
                    console.error('Token decryption failed');
                    localStorage.removeItem('authToken');
                    setIsLoading(false);
                    return;
                }
                
                // Set the decrypted token
                setToken(decryptedToken);
                setIsLoading(false);
            } catch (error) {
                console.error('Error during authentication initialization:', error);
                localStorage.removeItem('authToken'); // Clear token on error
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    return { token, isLoading };
};

export default useAuth;