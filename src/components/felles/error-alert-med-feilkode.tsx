import { Alert, BodyShort, CopyButton, Link, List, ReadMore, VStack } from '@navikt/ds-react';
import './alert-med-feilkode.css';
import React from 'react';
import { ListItem } from '@navikt/ds-react/List';

/**
 * Props for {@link ErrorAlertMedFeilkode}
 *
 * @param feilkoder en liste av feilkoder, default er `[]`
 * @param children generell feiltekst som vil vises før {@link ReadMore}-en, f.eks. "Noe gikk galt! Prøv igjen om noen minutter"
 */
interface ErrorAlertMedFeilkodeProps {
    feilkoder: string[];
    children: string;
}

/**
 * Komponent som wrapper en {@link Alert} med variant "error" og inkluderer en {@link ReadMore} som inneholder:
 * * en beskrivelse av hvor bruker kan melde inn feil
 * * en liste med feilkoder som bruker kan legge ved når man melder inn feil, gitt at
 * {@link ErrorAlertMedFeilkodeProps.feilkoder} inneholder minst et element
 */
export const ErrorAlertMedFeilkode = ({ feilkoder, children }: ErrorAlertMedFeilkodeProps) => {
    return (
        <Alert className="error-alert-med-feilkode__innhold" variant="error" size="small">
            <VStack gap="2">
                {children}
                <ReadMore size="small" header="Melde fra om feil?" className="error-alert-med-feilkode__read-more">
                    <VStack align="start" gap="1">
                        <BodyShort size="small">
                            For å melde inn feil kan du gå til{' '}
                            <Link href="https://jira.adeo.no/plugins/servlet/desk/portal/541/create/1401">Porten</Link>.
                            {feilkoder.length > 0 && (
                                <>
                                    {' '}
                                    For å gjøre det lettere å finne ut hva som er galt kan du legge ved følgende
                                    feilkode(r) i beskrivelsen når du melder inn feilen:
                                </>
                            )}
                        </BodyShort>
                        {feilkoder.length > 0 && (
                            <>
                                <List size="small">
                                    {feilkoder.map((feilkode) => (
                                        <ListItem key={feilkode}>{feilkode}</ListItem>
                                    ))}
                                </List>
                                <CopyButton
                                    copyText={feilkoder.join(', ')}
                                    size="small"
                                    text={feilkoder.length > 1 ? `Kopier feilkoder` : `Kopier feilkode`}
                                />
                            </>
                        )}
                    </VStack>
                </ReadMore>
            </VStack>
        </Alert>
    );
};
