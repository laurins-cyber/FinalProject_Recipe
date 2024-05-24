import { createRoot } from 'react-dom/client';
import App from './App';
import Footer from './components/Footer';
import React from 'react';


const container = document.getElementById('root');
const root = createRoot(container); // Create a root.

root.render(
<React.StrictMode>
    
    <App />
    <Footer />
</React.StrictMode>
);