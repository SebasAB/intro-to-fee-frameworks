import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the token exists in localStorage when the app loads
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // Set the authentication state to true if token exists
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};




AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
