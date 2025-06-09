import React from 'react';
import '../assets/css/styles.css';

function Footer() {
    return (
        <footer className="footer-futuristic">
            <div className="container">
                <div className="footer-row">
                    <div className="footer-column">
                        <h5 className="footer-title">Про нас</h5>
                        <p className="footer-text">
                            Платформа для управління ігровими серверами з підтримкою користувачів та адміністраторів.
                        </p>
                    </div>
                    <div className="footer-column">
                        <h5 className="footer-title">Посилання</h5>
                        <ul className="footer-links">
                            <li><a href="/" className="footer-link">Головна</a></li>
                            <li><a href="/login" className="footer-link">Вхід</a></li>
                            <li><a href="/register" className="footer-link">Реєстрація</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h5 className="footer-title">Контакти</h5>
                        <p className="footer-text">Email: <a href="mailto:support@gameserveradmin.com" className="footer-link">support@gameserveradmin.com</a></p>
                        <p className="footer-text">Телефон: <a href="tel:+380123456789" className="footer-link">+380 123 456 789</a></p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Game Server Admin. Усі права захищено.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;