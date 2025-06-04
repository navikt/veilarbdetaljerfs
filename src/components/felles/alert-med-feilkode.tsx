import { Alert, AlertProps, CopyButton, Link, ReadMore, VStack } from '@navikt/ds-react';
import './alert-med-feilkode.css';
import React from 'react';

/*
 * TypeScript sin "Omit" utility type lar oss konstruere en ny type uten de oppgitte feltene.
 * Vi bruker den her slik at vi skal kunne definere "variant" og "className" som optional (de er i utgangspunktet påkrevd i "AlertProps").
 */
interface AlertMedFeilkodeProps extends Omit<AlertProps, 'variant' | 'className'> {
    /* Props spesifikke for AlertMedFeilkode */
    feilkoder: string | string[];

    /* Props fra Alert */
    /* Syntaksen AlertProps[...] lar oss bevare typehintingen/tillatte typer fra de respektive feltene, slik at vi slipper å vedlikeholde disse selv. */
    variant?: AlertProps['variant'];
    className?: AlertProps['className'];
}

export const AlertMedFeilkode = ({
    feilkoder = [],
    variant = 'error',
    size = 'small',
    children,
    ...rest
}: AlertMedFeilkodeProps) => {
    const harFlereFeilkoder = Array.isArray(feilkoder) && feilkoder.length > 1;

    return (
        <Alert className="alert-med-feilkode__innhold" variant={variant} size={size} {...rest}>
            <VStack gap="2">
                {children}
                <ReadMore size="small" header="Melde ifra om feil?" className="alert-med-feilkode__read-more">
                    <VStack align="start" gap="1">
                        <span>
                            For å melde inn feil kan du gå til{' '}
                            <Link href="https://jira.adeo.no/plugins/servlet/desk">Porten</Link>. For å gjøre det
                            lettere for oss å finne ut hva som er galt kan du legge ved følgende feilkode(r):
                        </span>
                        <ul>
                            {(Array.isArray(feilkoder) ? feilkoder : [feilkoder]).map((feilkode) => (
                                <li>{feilkode}</li>
                            ))}
                        </ul>
                        <CopyButton
                            copyText={Array.isArray(feilkoder) ? feilkoder.join(', ') : feilkoder}
                            size="small"
                            text={harFlereFeilkoder ? `Kopier feilkoder` : `Kopier feilkode`}
                        />
                    </VStack>
                </ReadMore>
            </VStack>
        </Alert>
    );
};
