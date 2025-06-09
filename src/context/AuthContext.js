import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export { AuthContext };

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = (userData, redirect = true) => {
        const defaultUser = {
            email: userData.email || 'user@example.com',
            role: userData.role || 'user',
            servers: userData.servers || [],
            plans: {
                ...user?.plans,
                ...(userData.plans || {})
            } || {}, // Об’єднуємо плани, зберігаючи масиви
            createdAt: userData.createdAt || new Date().toISOString(),
        };
        setUser(defaultUser);
        localStorage.setItem('user', JSON.stringify(defaultUser));
        if (redirect) {
            if (defaultUser.role === 'admin') {
                window.location.href = '/admin-profile';
            } else {
                window.location.href = '/user-profile';
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);