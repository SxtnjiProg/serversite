import { Link } from 'react-router-dom';
import '../assets/css/not-found-styles.css'
function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-card">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Сторінку не знайдено. Схоже, ви заблукали в космосі!</p>
                <Link to="/" className="not-found-button">Повернутися на головну</Link>
            </div>
        </div>
    );
}

export default NotFoundPage;