import { Alert, AlertProps } from '@navikt/ds-react';
import './felles.css';
import React from 'react';

/**
 * TypeScript sin "Omit" utility type lar oss konstruere en ny type uten de oppgitte feltene.
 * Vi bruker den her slik at vi skal kunne definere "variant" og "className" som optional (de er i utgangspunktet påkrevd i "AlertProps").
 */
interface AlertMedFeilkodeProps extends Omit<AlertProps, 'variant' | 'className'> {
    /* Props spesifikke for AlertMedFeilkode */
    feilkode?: string | null;
    midtstill?: boolean;

    /* Props fra Alert */
    /* Syntaksen AlertProps[...] lar oss bevare typehintingen/tillatte typer fra de respektive feltene, slik at vi slipper å vedlikeholde disse selv. */
    variant?: AlertProps['variant'];
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
