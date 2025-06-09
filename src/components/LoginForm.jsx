import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            login(user, true); // Викликаємо login з перенаправленням
            // navigate(user.role === 'admin' ? '/admin-profile' : '/user-profile');
        } else {
            alert('Невірний email або пароль');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h3 className="text-center mb-4">Вхід</h3>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Пароль</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Увійти</button>
            <p className="text-center">
                Немає акаунту? <Link to="/register" className="text-primary">Зареєструйтесь</Link>
            </p>
        </form>
    );
}

export default LoginForm;