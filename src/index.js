import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './app/';
import App from './App';
import './styles/TableData.css';
import './styles/Modal.css';
import './styles/FileUpload.css';
import './styles/Toggle.css';
import './styles/StatusRank.css';
import './styles//AccountMenu.css';
import './styles/Details.css';
import './styles/General.css';
import './styles/Reponsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>
);
