import { Alert, AlertProps, Loader } from '@navikt/ds-react';
import './minikomponenter.css';
import React from 'react';

export const Laster = () => (
    <div className="midtstill">
        <Loader size="3xlarge" />
    </div>
);

interface AlertMedFeilkodeProps extends Omit<AlertProps, 'variant' | 'children'> {
    feilkode?: string | null;
    variant?: AlertProps['variant'];
    children?: AlertProps['children'];
    className?: string;
    midtstill?: boolean;
}

export const AlertMedFeilkode: React.FC<AlertMedFeilkodeProps> = ({
    feilkode = null,
    variant = 'error',
    size = 'small',
    midtstill = false,
    ...rest
}: AlertMedFeilkodeProps) => {
    const innhald = (
        <Alert variant={variant} size={size} {...rest}>
            Noe gikk galt! Prøv igjen om noen minutter.
            {feilkode && (
                <>
                    <br />
                    <em>Feilkode: {feilkode}.</em>
                </>
            )}
        </Alert>
    );

    return midtstill ? <div className="midtstill">{innhald}</div> : innhald;
};
