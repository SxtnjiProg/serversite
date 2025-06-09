import ServerCard from '../components/ServerCard';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import '../assets/css/cards.css';
import '../assets/css/filter-styles.css';
function HomePage() {
    const [servers, setServers] = useState(JSON.parse(localStorage.getItem('servers') || '[]'));
    const [filteredServers, setFilteredServers] = useState(servers);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [priceFilter, setPriceFilter] = useState('');
    const [gameFilter, setGameFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const filterPanelRef = useRef(null);
    const location = useLocation();

    const gameOptions = ['Minecraft', 'Rust', 'CS:GO'];

    const initializeDefaultServers = () => {
        const defaultServers = [
            {
                id: 1,
                name: 'Minecraft',
                image: '/assets/images/minecraft.png',
                description: 'Будуйте та досліджуйте унікальні світи у пісочниці!',
                plans: [
                    { name: 'Базовий', price: 10 },
                    { name: 'Стандарт', price: 20 },
                    { name: 'Преміум', price: 30 },
                ],
                status: 'Активний',
                createdAt: new Date().toISOString(),
            },
            {
                id: 2,
                name: 'CS:GO',
                image: '/assets/images/csgo.png',
                description: 'Динамічний командний шутер із турнірною сценою.',
                plans: [
                    { name: 'Базовий', price: 15 },
                    { name: 'Стандарт', price: 25 },
                    { name: 'Преміум', price: 35 },
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
                    { name: 'Базовий', price: 12 },
                    { name: 'Стандарт', price: 22 },
                    { name: 'Преміум', price: 32 },
                ],
                status: 'Активний',
                createdAt: '2025-05-30T00:00:00.000Z',
            },
        ];
        // Зберігаємо унікальні сервери за id
        const uniqueServers = defaultServers.filter(
            (server, index, self) => self.findIndex(s => s.id === server.id) === index
        );
        localStorage.setItem('servers', JSON.stringify(uniqueServers));
        return uniqueServers;
    };

    useEffect(() => {
        // Ініціалізація серверів
        let currentServers = JSON.parse(localStorage.getItem('servers') || '[]');
        if (currentServers.length === 0) {
            currentServers = initializeDefaultServers();
            setServers(currentServers);
        } else {
            // Видаляємо дублікати з localStorage
            const uniqueServers = currentServers.filter(
                (server, index, self) => self.findIndex(s => s.id === server.id) === index
            );
            if (uniqueServers.length !== currentServers.length) {
                localStorage.setItem('servers', JSON.stringify(uniqueServers));
                setServers(uniqueServers);
                currentServers = uniqueServers;
            }
        }

        // Отримання пошукового запиту з URL
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || '';
        setSearchQuery(search);

        // Скидання фільтрів при новому пошуковому запиті
        if (search !== searchQuery) {
            setPriceFilter('');
            setGameFilter('');
        }

        // Фільтрація серверів
        let result = [...currentServers];

        // Пошук за назвою або описом
        if (search) {
            result = result.filter(server =>
                server.name.toLowerCase().includes(search.toLowerCase()) ||
                server.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Фільтр за грою
        if (gameFilter) {
            result = result.filter(server => server.name === gameFilter);
        }

        // Фільтр за ціною
        if (priceFilter) {
            let min = 0, max = Infinity;
            if (priceFilter === '50+') {
                min = 50;
            } else if (priceFilter) {
                [min, max] = priceFilter.split('-').map(Number);
            }
            result = result.filter(server => {
                const price = server.plans[0].price;
                return price >= min && price <= max;
            });
        }

        setFilteredServers(result);
    }, [location.search, gameFilter, priceFilter]);

    const handlePriceFilter = (e) => {
        setPriceFilter(e.target.value);
    };

    const handleGameFilter = (e) => {
        setGameFilter(e.target.value);
    };

    const toggleFilterPanel = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleMouseLeave = () => {
        setIsFilterOpen(false);
    };

    return (
        <div className="homepage-container">
            <h2 className="text-center title-decorated mb-4">Доступні ігрові сервери</h2>
            <div className="filter-section mb-4">
                <button
                    className="btn btn-link text-white d-flex align-items-center mx-auto filter-button"
                    onClick={toggleFilterPanel}
                >
                    <FaFilter className="me-1" />
                </button>
                <div
                    className={`filter-panel p-3 ${isFilterOpen ? 'filter-open' : ''}`}
                    ref={filterPanelRef}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="priceFilter" className="form-label">Фільтр за ціною</label>
                            <select
                                id="priceFilter"
                                className="form-select filter-select"
                                value={priceFilter}
                                onChange={handlePriceFilter}
                            >
                                <option value="">Усі ціни</option>
                                <option value="0-10">$0 - $10</option>
                                <option value="10-20">$10 - $20</option>
                                <option value="20-50">$20 - $50</option>
                                <option value="50+">$50+</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="gameFilter" className="form-label">Фільтр за грою</label>
                            <select
                                id="gameFilter"
                                className="form-select filter-select"
                                value={gameFilter}
                                onChange={handleGameFilter}
                            >
                                <option value="">Усі ігри</option>
                                {gameOptions.map((game) => (
                                    <option key={game} value={game}>{game}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`row justify-content-center server-list ${isFilterOpen ? 'shifted' : ''}`}>
                {filteredServers.map(server => (
                    <ServerCard key={server.id} server={server} />
                ))}
                {filteredServers.length === 0 && (
                    <p className="text-center text-muted">Немає серверів, що відповідають критеріям.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;