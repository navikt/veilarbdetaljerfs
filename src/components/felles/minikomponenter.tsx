import { Alert, AlertProps, Loader } from '@navikt/ds-react';
import './minikomponenter.css';
import React from 'react';

export const Laster = () => (
    <div className="midtstill">
        <Loader size="3xlarge" />
    </div>
);

interface AlertMedFeilkodeProps extends Omit<AlertProps, 'variant' | 'children' | 'className'> {
    /* Props spesifikke for AlertMedFeilkode */
    feilkode?: string | null;
    midtstill?: boolean;

    /* Props fra Alert */
    variant?: AlertProps['variant'];
    children: AlertProps['children'];
    className?: AlertProps['className'];
}

export const AlertMedFeilkode: React.FC<AlertMedFeilkodeProps> = ({
    feilkode = null,
    variant = 'error',
    size = 'small',
    midtstill = false,
    children,
    ...rest
}: AlertMedFeilkodeProps) => {
    const innhald = (
        <Alert variant={variant} size={size} {...rest}>
            {children}
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
