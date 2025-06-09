import { useState } from 'react';

function AdminProfile({ setServers }) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('/assets/images/default.jpg');
    const [description, setDescription] = useState('Новий сервер');
    const [plan1Price, setPlan1Price] = useState('');
    const [plan1Adv1, setPlan1Adv1] = useState('');
    const [plan1Adv2, setPlan1Adv2] = useState('');
    const [plan1Adv3, setPlan1Adv3] = useState('');
    const [plan2Price, setPlan2Price] = useState('');
    const [plan2Adv1, setPlan2Adv1] = useState('');
    const [plan2Adv2, setPlan2Adv2] = useState('');
    const [plan2Adv3, setPlan2Adv3] = useState('');
    const [plan3Price, setPlan3Price] = useState('');
    const [plan3Adv1, setPlan3Adv1] = useState('');
    const [plan3Adv2, setPlan3Adv2] = useState('');
    const [plan3Adv3, setPlan3Adv3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const servers = JSON.parse(localStorage.getItem('servers') || '[]');
        const newServer = {
            id: servers.length + 1,
            name,
            image,
            description,
            plans: [
                {
                    name: 'Базовий',
                    price: plan1Price,
                    advantages: [plan1Adv1, plan1Adv2, plan1Adv3].filter(a => a)
                },
                {
                    name: 'Стандарт',
                    price: plan2Price,
                    advantages: [plan2Adv1, plan2Adv2, plan2Adv3].filter(a => a)
                },
                {
                    name: 'Преміум',
                    price: plan3Price,
                    advantages: [plan3Adv1, plan3Adv2, plan3Adv3].filter(a => a)
                },
            ],
            status: 'Активний',
            createdAt: new Date().toISOString(),
        };
        const updatedServers = [...servers, newServer];
        localStorage.setItem('servers', JSON.stringify(updatedServers));
        setServers(updatedServers);
        alert('Сервер додано!');
        setName('');
        setImage('/assets/images/default.jpg');
        setDescription('Новий сервер');
        setPlan1Price('');
        setPlan1Adv1('');
        setPlan1Adv2('');
        setPlan1Adv3('');
        setPlan2Price('');
        setPlan2Adv1('');
        setPlan2Adv2('');
        setPlan2Adv3('');
        setPlan3Price('');
        setPlan3Adv1('');
        setPlan3Adv2('');
        setPlan3Adv3('');
    };

    return (
        <div>
            {console.log('Rendering AdminProfile component')}
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="mb-3">
                    <label className="form-label">Назва гри</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">URL зображення</label>
                    <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Опис</label>
                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ціна базового плану ($/міс)</label>
                    <input type="number" className="form-control" value={plan1Price} onChange={(e) => setPlan1Price(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Переваги базового плану</label>
                    <input type="text" className="form-control" value={plan1Adv1} onChange={(e) => setPlan1Adv1(e.target.value)} placeholder="Перевага 1" />
                    <input type="text" className="form-control mt-2" value={plan1Adv2} onChange={(e) => setPlan1Adv2(e.target.value)} placeholder="Перевага 2" />
                    <input type="text" className="form-control mt-2" value={plan1Adv3} onChange={(e) => setPlan1Adv3(e.target.value)} placeholder="Перевага 3" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ціна стандартного плану ($/міс)</label>
                    <input type="number" className="form-control" value={plan2Price} onChange={(e) => setPlan2Price(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Переваги стандартного плану</label>
                    <input type="text" className="form-control" value={plan2Adv1} onChange={(e) => setPlan2Adv1(e.target.value)} placeholder="Перевага 1" />
                    <input type="text" className="form-control mt-2" value={plan2Adv2} onChange={(e) => setPlan2Adv2(e.target.value)} placeholder="Перевага 2" />
                    <input type="text" className="form-control mt-2" value={plan2Adv3} onChange={(e) => setPlan2Adv3(e.target.value)} placeholder="Перевага 3" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ціна преміум плану ($/міс)</label>
                    <input type="number" className="form-control" value={plan3Price} onChange={(e) => setPlan3Price(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Переваги преміум плану</label>
                    <input type="text" className="form-control" value={plan3Adv1} onChange={(e) => setPlan3Adv1(e.target.value)} placeholder="Перевага 1" />
                    <input type="text" className="form-control mt-2" value={plan3Adv2} onChange={(e) => setPlan3Adv2(e.target.value)} placeholder="Перевага 2" />
                    <input type="text" className="form-control mt-2" value={plan3Adv3} onChange={(e) => setPlan3Adv3(e.target.value)} placeholder="Перевага 3" />
                </div>
                <button type="submit" className="btn btn-primary">Додати сервер</button>
            </form>
        </div>
    );
}

export default AdminProfile;