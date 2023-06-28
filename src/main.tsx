import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import NAVSPA from '@navikt/navspa';

if (erMock()) {
    //@ts-ignore
    import('/src/data/mock/index').then(() => {
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
            <React.StrictMode>
                <img src="public/internflate20211122.png" id="veilarbpersonflatefs-root" />
                <App />
            </React.StrictMode>
        );
    });
} else {
    NAVSPA.eksporter('veilarbdetaljer', App);
}

function erMock() {
    return import.meta.env.MODE === 'development';
}
