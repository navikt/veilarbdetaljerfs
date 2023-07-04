import { Loader, Alert } from '@navikt/ds-react';
import './minikomponenter.css';

export const Laster = () => (
    <div className="midtStill">
        <Loader size="3xlarge" />
    </div>
);

export const Errormelding = () => (
    <div className="midtStill">
        <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
    </div>
);
