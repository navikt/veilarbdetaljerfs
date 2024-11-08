import { Alert, AlertProps } from '@navikt/ds-react';
import './felles.css';
import React from 'react';

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
            <div>{children}</div>
            {feilkode && (
                <div>
                    <br />
                    <em>Feilkode: {feilkode}.</em>
                </div>
            )}
        </Alert>
    );

    return midtstill ? <div className="midtstill">{innhald}</div> : innhald;
};
