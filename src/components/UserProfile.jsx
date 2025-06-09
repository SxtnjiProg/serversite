import { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function UserProfile({ user }) {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const servers = JSON.parse(localStorage.getItem('servers') || '[]');
    const userServers = user?.servers || [];

    const handleDeleteOrder = (serverId, index) => {
        const updatedServers = [...user.servers];
        updatedServers.splice(index, 1);

        const updatedPlans = { ...user.plans };
        delete updatedPlans[serverId];

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(u => {
            if (u.email === user.email) {
                return {
                    ...u,
                    servers: updatedServers,
                    plans: updatedPlans
                };
            }
            return u;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        login({
            ...user,
            servers: updatedServers,
            plans: updatedPlans
        });
        alert('Замовлення скасовано!');
    };

    return (
        <>
            {userServers.length > 0 ? (
                <ul className="list-group">
                    {userServers.map((serverId, index) => {
                        const server = servers.find(s => s.id === serverId);
                        const plan = user.plans?.[serverId] || 'Не вказано';
                        console.log(`Server ID: ${serverId}, Plan: ${plan}, Index: ${index}`);
                        return server ? (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <strong>{server.name}</strong> (ID: {serverId}) - План: {plan}
                                </span>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteOrder(serverId, index)}
                                    style={{ padding: '2px 6px' }}
                                >
                                    <FaTimes />
                                </button>
                            </li>
                        ) : null;
                    })}
                </ul>
            ) : (
                <p>Немає оплачених серверів</p>
            )}
        </>
    );
}

export default UserProfile;