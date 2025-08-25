import { Alert, BodyShort, CopyButton, Link, List, ReadMore, VStack } from '@navikt/ds-react';
import './alert-med-feilkode.css';
import React from 'react';
import { ListItem } from '@navikt/ds-react/List';
import { trackAmplitude } from '../../amplitude/amplitude.ts';

/**
 * Props for {@link ErrorAlertMedFeilkode}
 *
 * @param feilkoder en liste av feilkoder, default er `[]`
 * @param children generell feiltekst som vil vises før {@link ReadMore}-en, f.eks. "Noe gikk galt! Prøv igjen om noen minutter"
 * @param aktiverSporing hvorvidt statistikk for klikk på knapper i komponenten skal spores
 */
interface ErrorAlertMedFeilkodeProps {
    feilkoder: string[];
    children: string;
    aktiverSporing?: boolean;
}

/**
 * Komponent som wrapper en {@link Alert} med variant "error" og inkluderer en {@link ReadMore} som inneholder:
 * * en beskrivelse av hvor bruker kan melde inn feil
 * * en liste med feilkoder som bruker kan legge ved når man melder inn feil, gitt at
 * {@link ErrorAlertMedFeilkodeProps.feilkoder} inneholder minst et element
 */
export const ErrorAlertMedFeilkode = ({ feilkoder, children, aktiverSporing = false }: ErrorAlertMedFeilkodeProps) => {
    return (
        <Alert className="error-alert-med-feilkode__innhold" variant="error" size="small">
            <VStack gap="space-8">
                {children}
                <ReadMore
                    className="error-alert-med-feilkode__read-more"
                    header="Melde fra om feil?"
                    onClick={
                        aktiverSporing
                            ? () =>
                                  trackAmplitude({
                                      name: 'knapp klikket',
                                      data: {
                                          knapptekst: 'Melde fra om feil?'
                                      }
                                  })
                            : undefined
                    }
                    size="small"
                >
                    <VStack align="start" gap="space-4">
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
                                    onClick={
                                        aktiverSporing
                                            ? () =>
                                                  trackAmplitude({
                                                      name: 'knapp klikket',
                                                      data: {
                                                          knapptekst:
                                                              feilkoder.length > 1
                                                                  ? `Kopier feilkoder`
                                                                  : `Kopier feilkode`
                                                      }
                                                  })
                                            : undefined
                                    }
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
