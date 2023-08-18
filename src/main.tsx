import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import NAVSPA from '@navikt/navspa';
import { erMock } from './utils/miljo-utils.ts';

if (erMock()) {
    //@ts-ignore
    import('/src/data/mock/index').then(() => {
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
            <React.StrictMode>
                <img src="/internflate20211122.png" id="veilarbpersonflatefs-root" alt="internflate bilde" />
                <App fnr={'12118323058'} />
            </React.StrictMode>
        );
    });
} else {
    NAVSPA.eksporter('veilarbdetaljer', App);
}
