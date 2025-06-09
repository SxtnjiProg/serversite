import UserProfile from '../components/UserProfile';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/userProfile.css';
import { FaArrowLeft } from 'react-icons/fa'; // Додаємо іконку стрілки (потрібно встановити react-icons: npm install react-icons)

function UserProfilePage() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('info');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null; // Захист від рендерингу без авторизації

    const handleBack = () => {
        navigate(-1); // Повернення на попередню сторінку
    };

    return (
        <div className="container py-5">
            <div className="user-profile-card">
                <h3 className="text-center">Профіль користувача</h3>
                <div className="back-button" onClick={handleBack}>
                    <FaArrowLeft /> Повернутися назад
                </div>
                <div className="user-profile-tabs">
                    <div
                        className={`user-profile-tab ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => setActiveTab('info')}
                    >
                        Інформація
                    </div>
                    <div
                        className={`user-profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Замовлення
                    </div>
                </div>
                <div className="user-profile-tab-content">
                    <div className={`user-info ${activeTab === 'info' ? 'active' : ''}`}>
                        <h4>Інформація про користувача</h4>
                        <p><strong>Email:</strong> {user?.email || 'Не вказано'}</p>
                        <p><strong>Дата реєстрації:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Не вказано'}</p>
                        <p><strong>Роль:</strong> {user?.role || 'Користувач'}</p>
                        <p><strong>Кількість серверів:</strong> {user?.servers?.length || 0}</p>
                    </div>
                    <div className={`user-orders ${activeTab === 'orders' ? 'active' : ''}`}>
                        <h4>Мої замовлення</h4>
                        <UserProfile user={user} />
                    </div>
                </div>
                <div className="logout-button">
                    <button onClick={logout} className="btn btn-danger">
                        Вихід
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;