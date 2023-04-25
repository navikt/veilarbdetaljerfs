import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import NAVSPA from "@navikt/navspa"


const erLokal = true;

if (erLokal) {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
    )
} else {
    NAVSPA.eksporter('veilarbdetaljerfs', App);
}
