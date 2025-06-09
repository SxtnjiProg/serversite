import React from 'react';
import { createRoot } from 'react-dom/client'; // Імпортуємо createRoot
import App from './App';

const root = createRoot(document.getElementById('root')); // Створюємо корінь
root.render(<App />); // Рендеримо додаток