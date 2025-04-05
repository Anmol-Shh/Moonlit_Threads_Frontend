import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setUser({ token, username });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:4000/login', { username, password });
            const { token } = response.data;
            setUser({ token, username });
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            setError(null);
            navigate('/cart'); // Redirect to cart after successful login
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during login');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setError(null);
        navigate('/'); // Redirect to home after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
