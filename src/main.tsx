import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import NAVSPA from '@navikt/navspa';
import './data/mock/index.tsx';

if (erMock()) {
    // const { worker } = require('./src/data/mock/index')
    // worker.start()
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <img src="public/internflate20211122.png" id="veilarbpersonflatefs-root" />
            <App />
        </React.StrictMode>
    );
} else {
    NAVSPA.eksporter('veilarbdetaljer', App);
}

function erMock() {
    return import.meta.env.MODE === 'development';
}
