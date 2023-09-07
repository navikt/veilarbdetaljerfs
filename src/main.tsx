import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { WEB_COMPONENT_APPNAVN, erMock } from './utils/miljo-utils.ts';
import { Veilarbdetaljer } from './WebComponentWrapper.tsx';

if (erMock()) {
    //@ts-ignore
    import('/src/data/mock/index').then(() => {
        createRoot(document.getElementById('root') as HTMLElement).render(
            <React.StrictMode>
                <img
                    src={`${import.meta.env.BASE_URL}internflate20211122.png`}
                    id="veilarbpersonflatefs-root"
                    alt="internflate bilde"
                />
                <App fnr={'12118323058'} />
            </React.StrictMode>
        );
    });
} else {
    customElements.define(WEB_COMPONENT_APPNAVN, Veilarbdetaljer);
}
