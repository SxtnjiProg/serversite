import { Link } from 'react-router-dom';

function ServerCard({ server }) {
    const imageSrc = server.image || ''; // Порожній, якщо зображення відсутнє

    console.log(`Loading image for ${server.name}: ${imageSrc}`);

    return (
        <div className="server-card h-100">
            {imageSrc ? (
                <img
                    src={imageSrc}
                    className="card-img-top"
                    alt={`${server.name} banner`}
                />
            ) : (
                <div className="card-img-top" style={{ height: '150px', backgroundColor: '#e9ecef' }}></div> // Стилізована заглушка
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{server.name}</h5>
                <p className="card-text flex-grow-1">
                    {server.description || 'Опис гри недоступний.'}
                </p>
                <p className="card-text fw-bold text-primary">
                    Від ${server.plans[0].price}/міс
                </p>
                <Link
                    to={`/server/${server.id}`}
                    className="btn btn-primary mt-auto"
                    aria-label={`Переглянути деталі сервера ${server.name}`}
                >
                    Детальніше
                </Link>
            </div>
        </div>
    );
}

export default ServerCard;