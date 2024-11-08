import { Alert, AlertProps, Loader } from '@navikt/ds-react';
import './minikomponenter.css';
import React from 'react';

export const Laster = () => (
    <div className="midtstill">
        <Loader size="3xlarge" />
    </div>
);

interface AlertMedFeilkodeProps extends AlertProps {
    feilkode?: string | null;
}

export const AlertMedFeilkode: React.FC<AlertMedFeilkodeProps> = ({
    feilkode = null,
    variant = 'error',
    size = 'small',
    ...rest
}: AlertMedFeilkodeProps) => {
    return (
        <div className="midtstill">
            <Alert variant={variant} size={size} {...rest}>
                Noe gikk galt! Prøv igjen om noen minutter.
                {feilkode && (
                    <>
                        <br />
                        <em>Feilkode: {feilkode}.</em>
                    </>
                )}
            </Alert>
        </div>
    );
};
