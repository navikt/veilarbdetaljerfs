import { Loader, Alert } from '@navikt/ds-react';
import './minikomponenter.css';

export const Laster = () => (
    <div className="midtstill">
        <Loader size="3xlarge" />
    </div>
);

export const Errormelding = () => (
    <div className="midtstill">
        <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
    </div>
);

export const IngenCv = () => (
    <div className="midtstill">
        <Alert variant="warning">Ingen CV registrert</Alert>
    </div>
);
