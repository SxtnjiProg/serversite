import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ServerDetails() {
    const { id } = useParams();
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const servers = JSON.parse(localStorage.getItem('servers') || '[]');
    const server = servers.find(s => s.id === parseInt(id));
    const [selectedPlan, setSelectedPlan] = useState('');

    if (!server || !server.plans) return <div>Сервер не знайдено</div>;

    const handleOrder = () => {
        if (!user) {
            alert('Будь ласка, увійдіть, щоб замовити сервер');
            navigate('/login');
            return;
        }
        if (!selectedPlan) {
            alert('Виберіть план перед замовленням');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => {
            if (u.email === user.email) {
                return {
                    ...u,
                    servers: [...(u.servers || []), server.id],
                    selectedPlan: selectedPlan // Передаємо обраний план
                };
            }
            return u;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        login({
            ...user,
            servers: [...(user.servers || []), server.id],
            selectedPlan: selectedPlan // Оновлюємо контекст
        });
        alert('Сервер замовлено!');
        navigate('/user-profile');
    };

    return (
        <div className="card p-4" style={{ background: '#16213e', color: '#fff' }}>
            <h3>{server.name}</h3>
            <p>ID: {server.id}</p>
            <h4>Тарифні плани</h4>
            <div className="plans-list">
                {server.plans.map((plan, index) => (
                    <button
                        key={index}
                        className={`plan-item ${selectedPlan === plan.name ? 'active' : ''}`}
                        onClick={() => setSelectedPlan(plan.name)}
                    >
                        <span>{plan.name}</span>
                        <span className="price">${plan.price}/міс</span>
                    </button>
                ))}
            </div>
            <button
                className="btn btn-primary mt-4"
                style={{ background: 'linear-gradient(90deg, #ff7f50, #ff4500)', border: 'none', color: '#fff' }}
                onClick={handleOrder}
                disabled={!selectedPlan}
            >
                Замовити сервер
            </button>
        </div>
    );
}

export default ServerDetails;