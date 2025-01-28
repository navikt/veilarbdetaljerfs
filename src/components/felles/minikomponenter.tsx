import { Loader, Alert } from '@navikt/ds-react';
import './minikomponenter.css';

export const Laster = () => (
    <div className="midtstill_minikomponent">
        <Loader size="3xlarge" />
    </div>
);

export const Errormelding = () => (
    <div className="midtstill_minikomponent">
        <Alert variant="error" size="small">
            Noe gikk galt! Prøv igjen om noen minutter.
        </Alert>
    </div>
);
