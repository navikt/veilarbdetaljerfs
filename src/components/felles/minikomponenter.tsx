import { Loader, Alert } from '@navikt/ds-react';
import './minikomponenter.css';

export const Laster = () => (
    <div className="midtstill">
        <Loader size="3xlarge" />
    </div>
);

export const Errormelding = () => (
    <div className="midtstill">
        <Alert variant="error" size="small">
            Noe gikk galt! Prøv igjen om noen minutter.
        </Alert>
    </div>
);

export const MidtstiltMelding = ({
    size,
    variant,
    text
}: {
    size: 'medium' | 'small';
    variant: 'error' | 'warning';
    text: string;
}) => (
    <div className="midtstill">
        <Alert variant={variant} size={size}>
            {text}
        </Alert>
    </div>
);
