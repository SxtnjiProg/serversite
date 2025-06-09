import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export { AuthContext };

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    const login = (userData, redirect = true) => {
        const defaultUser = {
            email: userData.email || 'user@example.com',
            role: userData.role || 'user',
            servers: userData.servers || [],
            plans: {
                ...user?.plans,
                ...(userData.plans || {})
            } || {},
            createdAt: userData.createdAt || new Date().toISOString(),
        };
        setUser(defaultUser);
        localStorage.setItem('user', JSON.stringify(defaultUser));
        if (redirect) {
            if (defaultUser.role === 'admin') {
                navigate('/admin-profile');
            } else {
                navigate('/user-profile');
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);