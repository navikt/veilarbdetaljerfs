import { Alert, AlertProps, CopyButton, Link, ReadMore, VStack } from '@navikt/ds-react';
import './alert-med-feilkode.css';
import React from 'react';

/*
 * TypeScript sin "Omit" utility type lar oss konstruere en ny type uten de oppgitte feltene.
 * Vi bruker den her slik at vi skal kunne definere "variant" og "className" som optional (de er i utgangspunktet påkrevd i "AlertProps").
 */
interface AlertMedFeilkodeProps extends Omit<AlertProps, 'variant' | 'className'> {
    /* Props spesifikke for AlertMedFeilkode */
    feilkode?: string | null;

    /* Props fra Alert */
    /* Syntaksen AlertProps[...] lar oss bevare typehintingen/tillatte typer fra de respektive feltene, slik at vi slipper å vedlikeholde disse selv. */
    variant?: AlertProps['variant'];
    className?: AlertProps['className'];
}

export const AlertMedFeilkode = ({
    feilkode = null,
    variant = 'error',
    size = 'small',
    children,
    ...rest
}: AlertMedFeilkodeProps) => {
    return (
        <Alert className="alert-med-feilkode__innhold" variant={variant} size={size} {...rest}>
            <VStack gap="2">
                {children}
                <ReadMore size="small" header={'Melde ifra om feil?'} className="alert-med-feilkode__read-more">
                    {feilkode ? (
                        <VStack align="start" gap="1">
                            <div>
                                For å melde inn feil kan du gå til{' '}
                                <Link href="https://jira.adeo.no/plugins/servlet/desk">Porten</Link>. Oppgi følgende
                                kode for å gjøre det lettere for oss å finne ut hva som er galt: {feilkode}
                            </div>
                            <CopyButton copyText={feilkode} size="xsmall" text="Kopier feilkode" />
                        </VStack>
                    ) : (
                        <div>
                            For å melde inn feil kan du gå til{' '}
                            <Link href="https://jira.adeo.no/plugins/servlet/desk">Porten</Link>.
                        </div>
                    )}
                </ReadMore>
            </VStack>
        </Alert>
    );
};
