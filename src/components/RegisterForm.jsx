import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            alert('Користувач із таким email вже існує');
            return;
        }
        const newUser = { email, password, role, servers: [], createdAt: new Date().toISOString(), plans: {} };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        login(newUser, true); // Викликаємо login з перенаправленням
        // navigate(role === 'admin' ? '/admin-profile' : '/user-profile');
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Реєстрація</h3>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Пароль</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Роль</label>
                <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">Користувач</option>
                    <option value="admin">Адміністратор</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Зареєструватися</button>
        </form>
    );
}

export default RegisterForm;