import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../assets/css/styles.css';

function Header() {
    const { user, logout } = useAuth() || {};
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-futuristic">
            <div className="container">
                <NavLink className="navbar-brand navbar-brand-futuristic" to="/">ServeRR</NavLink>
                <button
                    className="navbar-toggler navbar-toggler-futuristic"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <form className="d-flex ms-3 me-auto search-form-futuristic" onSubmit={handleSearch}>
                        <div className="input-group">
                            <span className="input-group-icon-futuristic">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control search-input-futuristic"
                                placeholder="Пошук серверів..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-futuristic" to="/">Головна</NavLink>
                        </li>
                        {user ? (
                            <>
                                {user.role === 'admin' ? (
                                    <li className="nav-item">
                                        <NavLink className="nav-link nav-link-futuristic" to="/admin-profile">Панель адміна</NavLink>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <NavLink className="nav-link nav-link-futuristic" to="/user-profile">Профіль</NavLink>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button
                                        className="nav-link nav-link-futuristic btn btn-link"
                                        onClick={logout}
                                    >
                                        Вихід
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link nav-link-futuristic" to="/login">Увійти</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link nav-link-futuristic" to="/register">Зареєструватися</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;