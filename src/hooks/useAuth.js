import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDecryptToken } from '../App';

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
                    // No token found, redirect to login
                    navigate('/login', { state: { from: location.pathname }, replace: true });
                    return;
                }
                const decryptedToken = useDecryptToken(encryptedToken); // Assuming useDecryptToken now just decrypts
                if (!decryptedToken) {
                    // Token found but decryption failed, redirect to login
                    localStorage.removeItem('authToken'); // Clear invalid token
                    navigate('/login', { state: { from: location.pathname }, replace: true });
                    return;
                }
                setToken(decryptedToken);
            } catch (error) {
                console.error('Error during authentication initialization:', error);
                localStorage.removeItem('authToken'); // Clear token on error
                navigate('/login', { state: { from: location.pathname }, replace: true });
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [navigate, location]);

    return { token, isLoading };
};

export default useAuth;