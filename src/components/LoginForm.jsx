import { useState, useContext, useEffect } from 'react';
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
            login(user, true);
        } else {
            alert('Невірний email або пароль');
        }
    };

    const handleGoogleLogin = (response) => {
        console.log('Відповідь Google Login:', response);
        const { credential } = response; // Отримуємо ID token
        if (!credential) {
            console.error('Токен відсутній у відповіді');
            alert('Помилка входу через Google: токен не отриманий');
            return;
        }

        try {
            // Розбиваємо токен на частини (header, payload, signature)
            const [headerEncoded, payloadEncoded] = credential.split('.');
            if (!payloadEncoded) {
                throw new Error('Некоректний формат токена: payload відсутній');
            }

            // Додаємо padding для коректного base64 декодування
            let base64Payload = payloadEncoded.replace(/-/g, '+').replace(/_/g, '/');
            while (base64Payload.length % 4) {
                base64Payload += '=';
            }

            // Декодуємо payload
            const decodedPayload = atob(base64Payload);
            const payload = JSON.parse(decodedPayload);
            console.log('Декодовані дані:', payload);

            const googleUser = {
                email: payload.email,
                name: payload.name || 'Користувач Google',
                googleId: payload.sub,
                role: payload.email.endsWith('@admin.com') ? 'admin' : 'user',
                createdAt: new Date().toISOString(),
                servers: [],
                plans: {},
            };

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(u => u.googleId === googleUser.googleId || u.email === googleUser.email);
            if (!existingUser) {
                users.push(googleUser);
                localStorage.setItem('users', JSON.stringify(users));
            }

            login(existingUser || googleUser, true);
            alert('Успішний вхід через Google!');
        } catch (error) {
            console.error('Помилка декодування або обробки токена:', error);
            alert('Помилка входу через Google: ' + error.message);
        }
    };

    useEffect(() => {
        if (window.google) {
            // eslint-disable-next-line no-undef
            google.accounts.id.initialize({
                client_id: '44035042672-kmm8vi0br0ng5lfr2f5f0pf2j45q0cmv.apps.googleusercontent.com', // Замініть на ваш Client ID
                callback: handleGoogleLogin,
            });
            // eslint-disable-next-line no-undef
            google.accounts.id.renderButton(
                document.getElementById('googleSignInButton'),
                { theme: 'filled_black', size: 'large', text: 'signin_with', width: '100' }
            );
            // eslint-disable-next-line no-undef
            google.accounts.id.prompt();
        } else {
            console.error('Google API не завантажено');
        }
    }, []);

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
            <div id="googleSignInButton" className="mb-3"></div>
            <p className="text-center">
                Немає акаунту? <Link to="/register" className="text-primary">Зареєструйтесь</Link>
            </p>
        </form>
    );
}

export default LoginForm;