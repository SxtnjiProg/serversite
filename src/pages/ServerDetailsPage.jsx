import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/serverDetails.css';

function ServerDetailsPage() {
    const { id } = useParams();
    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [servers, setServers] = useState(() => {
        const storedServers = JSON.parse(localStorage.getItem('servers') || '[]');
        console.log('Initial servers from localStorage:', storedServers);
        return storedServers;
    });
    const [selectedPlan, setSelectedPlan] = useState('');
    const [expandedPlan, setExpandedPlan] = useState(null);

    useEffect(() => {
        if (servers.length === 0) {
            console.log('Initializing default servers...');
            const defaultServers = [
                {
                    id: 1,
                    name: 'Minecraft',
                    image: '/assets/images/minecraft.jpg',
                    description: 'Будуйте та досліджуйте унікальні світи у пісочниці!',
                    plans: [
                        { name: 'Базовий', price: 10, advantages: ['Базовий доступ', 'FTP доступ', 'MySQL'] },
                        { name: 'Стандарт', price: 20, advantages: ['Захист від DDoS', 'FTP та MySQL', 'Більше слотів'] },
                        { name: 'Преміум', price: 30, advantages: ['Максимальні слоти', 'Захист DDoS', 'Висока продуктивність'] }
                    ],
                    status: 'Активний',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: 2,
                    name: 'CS:GO',
                    image: '/assets/images/csgo.jpg',
                    description: 'Динамічний командний шутер із турнірною сценою.',
                    plans: [
                        { name: 'Базовий', price: 15, advantages: ['Базовий доступ', 'FTP доступ', 'MySQL'] },
                        { name: 'Стандарт', price: 25, advantages: ['Захист від DDoS', 'FTP та MySQL', 'Більше слотів'] },
                        { name: 'Преміум', price: 35, advantages: ['Максимальні слоти', 'Захист DDoS', 'Висока продуктивність'] }
                    ],
                    status: 'Активний',
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: 3,
                    name: 'Rust',
                    image: '/assets/images/rust.jpg',
                    description: 'Виживайте у суворих умовах із друзями чи ворогами.',
                    plans: [
                        { name: 'Базовий', price: 12, advantages: ['Базовий доступ', 'FTP доступ', 'MySQL'] },
                        { name: 'Стандарт', price: 22, advantages: ['Захист від DDoS', 'FTP та MySQL', 'Більше слотів'] },
                        { name: 'Преміум', price: 32, advantages: ['Максимальні слоти', 'Захист DDoS', 'Висока продуктивність'] }
                    ],
                    status: 'Активний',
                    createdAt: '2025-05-30T00:00:00.000Z',
                },
            ];
            localStorage.setItem('servers', JSON.stringify(defaultServers));
            setServers(defaultServers);
            console.log('Default servers initialized:', defaultServers);
        }
    }, []);

    const server = servers.find(s => s.id === parseInt(id));
    console.log('Current server:', server, 'with id:', id);

    if (!server) {
        return <div className="container py-5 text-center">Сервер не знайдено</div>;
    }

    const handlePlanSelect = (planName) => {
        setSelectedPlan(planName);
        setExpandedPlan(expandedPlan === planName ? null : planName);
    };

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
                    plans: { ...u.plans, [server.id]: selectedPlan } // Додаємо план для цього serverId
                };
            }
            return u;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        const updatedUser = updatedUsers.find(u => u.email === user.email);
        console.log('Updated user plans after order:', updatedUser.plans); // Для відладки
        login({
            ...user,
            servers: [...(user.servers || []), server.id],
            plans: { ...user.plans, [server.id]: selectedPlan } // Додаємо план, не перезаписуючи
        });
        alert('Сервер замовлено!');
        navigate('/user-profile');
    };

    return (
        <div className="container py-5">
            <div className="server-details-card">
                <div className="card-header bg-dark text-white text-center">
                    <h2 className="mb-0">{server.name}</h2>
                    <span className="badge bg-success">{server.status}</span>
                </div>
                <img src={server.image} className="card-img-top" alt={`${server.name} banner`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                <div className="card-body text-center">
                    <p className="card-text lead">{server.description}</p>
                    <h4 className="mt-4">Тарифи</h4>
                    <div className="plans-list">
                        {server.plans && server.plans.length > 0 && server.plans.map((plan, index) => (
                            <button
                                key={index}
                                className={`plan-item ${selectedPlan === plan.name ? 'active' : ''} ${expandedPlan === plan.name ? 'expanded' : ''}`}
                                onClick={() => handlePlanSelect(plan.name)}
                                disabled={!plan}
                            >
                                <span>{plan.name || 'Немає плану'}</span>
                                <span className="price">{plan.price ? `$${plan.price}/міс` : 'N/A'}</span>
                                {expandedPlan === plan.name && plan.advantages && (
                                    <div className="plan-advantages">
                                        <ul>
                                            {plan.advantages.map((advantage, i) => (
                                                <li key={i}>{advantage || 'Немає переваг'}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <button
                        className={`btn-order mt-4 ${selectedPlan ? 'active' : ''}`}
                        onClick={handleOrder}
                        disabled={!selectedPlan}
                    >
                        Замовити сервер
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServerDetailsPage;