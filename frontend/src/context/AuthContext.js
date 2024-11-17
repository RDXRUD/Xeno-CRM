import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create a context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is already authenticated
        axios.get('http://localhost:5001/')
            .then(response => {
                if (response.data.user) {
                    setUser(response.data.user);
                }
            }).catch(err => {
                console.log(err);
            });
    }, []);

    const login = async () => {
        window.location.href = 'http://localhost:5001/auth/google'; // Redirect to Google login
    };

    const logout = async () => {
        await axios.get('http://localhost:5001/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access authentication state
export const useAuth = () => useContext(AuthContext);