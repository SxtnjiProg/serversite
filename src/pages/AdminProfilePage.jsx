import AdminProfile from '../components/AdminProfile';
import { useState, useEffect } from 'react';
import '../assets/css/adminProfile.css';

function AdminProfilePage() {
    const [activeTab, setActiveTab] = useState('add-server');
    const [servers, setServers] = useState(() => JSON.parse(localStorage.getItem('servers') || '[]'));

    useEffect(() => {
        const storedServers = JSON.parse(localStorage.getItem('servers') || '[]');
        setServers(storedServers);
    }, []);

    const handleDeleteServer = (serverId) => {
        const updatedServers = servers.filter(s => s.id !== serverId);
        localStorage.setItem('servers', JSON.stringify(updatedServers));
        setServers(updatedServers);
        alert('Сервер видалено!');
    };

    return (
        <div className="container py-5">
            <div className="admin-profile-card">
                <h3>Профіль адміністратора</h3>
                <div className="admin-profile-tabs">
                    <div
                        className={`admin-profile-tab ${activeTab === 'add-server' ? 'active' : ''}`}
                        onClick={() => setActiveTab('add-server')}
                    >
                        Додати сервер
                    </div>
                    <div
                        className={`admin-profile-tab ${activeTab === 'manage-servers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manage-servers')}
                    >
                        Керування серверами
                    </div>
                </div>
                <div className="admin-profile-tab-content">
                    {activeTab === 'add-server' && (
                        <div className="admin-form active">
                            <AdminProfile setServers={setServers} />
                        </div>
                    )}
                    {activeTab === 'manage-servers' && (
                        <div className="admin-form active">
                            <h4>Список серверів</h4>
                            {servers.length > 0 ? (
                                servers.map((server) => (
                                    <div key={server.id} className="server-item">
                                        {server.name} (ID: {server.id})
                                        <button
                                            className="btn btn-danger ms-3"
                                            onClick={() => handleDeleteServer(server.id)}
                                        >
                                            Видалити
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>Немає доданих серверів</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminProfilePage;