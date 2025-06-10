import { useRef, useState } from 'react';
import { BodyShort, Button, Checkbox, CheckboxGroup, HStack, Popover, Select, Switch, VStack } from '@navikt/ds-react';
import './utviklerinnstillinger.css';
import {
    feilkoder,
    hentUtviklerInnstillinger,
    lagreUtviklerinnstillinger,
    slettUtviklerinnstillinger,
    UTVIKLER_INNSTILLINGER_VERSJON,
    UtviklerInnstillingerSpesifikk
} from './utviklerinnstillinger.ts';
import { Endepunkt, endepunkter } from '../../data/api/fetch.ts';

export const Utviklerinnstillinger = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    const utviklerInnstillingerDefaultState: UtviklerInnstillingerSpesifikk = {
        versjon: UTVIKLER_INNSTILLINGER_VERSJON,
        innstillinger: {
            simulerEndepunktFeil: {
                aktivert: false,
                endepunktKonfigurasjon: Object.fromEntries(
                    Object.values(endepunkter).map((endepunkt) => {
                        const konfigurasjonEntry = [
                            endepunkt,
                            {
                                endepunkt: endepunkt,
                                simulerFeil: false,
                                statuskode: null
                            }
                        ];

                        return konfigurasjonEntry;
                    })
                )
            }
        }
    };
    const [lagredeUtviklerInnstillinger] = useState<UtviklerInnstillingerSpesifikk | null>(hentUtviklerInnstillinger);
    const [utviklerInnstillinger, setUtviklerInnstillinger] = useState<UtviklerInnstillingerSpesifikk>(
        lagredeUtviklerInnstillinger ?? utviklerInnstillingerDefaultState
    );

    return (
        <>
            <Button
                aria-expanded={openState}
                className="utviklerinnstillinger"
                onClick={() => setOpenState(!openState)}
                ref={buttonRef}
                variant="primary-neutral"
            >
                Åpne utviklerinnstillinger
            </Button>
            <Popover
                open={openState}
                onClose={() => {
                    setOpenState(false);
                    if (utviklerInnstillinger !== hentUtviklerInnstillinger()) {
                        setUtviklerInnstillinger(hentUtviklerInnstillinger() ?? utviklerInnstillingerDefaultState);
                    }
                }}
                anchorEl={buttonRef.current}
            >
                <Popover.Content>
                    <VStack gap="4">
                        <Switch
                            checked={utviklerInnstillinger.innstillinger.simulerEndepunktFeil.aktivert}
                            onClick={() => {
                                setUtviklerInnstillinger((prevState) => ({
                                    ...prevState,
                                    innstillinger: {
                                        ...prevState.innstillinger,
                                        simulerEndepunktFeil: {
                                            ...prevState.innstillinger.simulerEndepunktFeil,
                                            aktivert: !prevState.innstillinger.simulerEndepunktFeil.aktivert
                                        }
                                    }
                                }));
                            }}
                            size="small"
                        >
                            Simuler feil i endepunkter
                        </Switch>
                        {utviklerInnstillinger.innstillinger.simulerEndepunktFeil.aktivert && (
                            <CheckboxGroup
                                value={Object.entries(
                                    utviklerInnstillinger.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon
                                )
                                    .filter((konfigurasjonEntry) => konfigurasjonEntry[1].simulerFeil)
                                    .map(([endepunkt]) => endepunkt)}
                                onChange={(valgteEndepunkter: Endepunkt[]) =>
                                    setUtviklerInnstillinger((prevState) => ({
                                        ...prevState,
                                        innstillinger: {
                                            ...prevState.innstillinger,
                                            simulerEndepunktFeil: {
                                                ...prevState.innstillinger.simulerEndepunktFeil,
                                                endepunktKonfigurasjon: Object.fromEntries(
                                                    Object.entries(
                                                        prevState.innstillinger.simulerEndepunktFeil
                                                            .endepunktKonfigurasjon
                                                    ).map(([endepunkt, konfigurasjon]) => {
                                                        const konfigurasjonEntry = [
                                                            endepunkt,
                                                            {
                                                                endepunkt: konfigurasjon.endepunkt,
                                                                simulerFeil: valgteEndepunkter.some(
                                                                    (valgtEndepunkt) => endepunkt === valgtEndepunkt
                                                                ),
                                                                statuskode: valgteEndepunkter.some(
                                                                    (valgtEndepunkt) => endepunkt === valgtEndepunkt
                                                                )
                                                                    ? konfigurasjon.statuskode
                                                                    : null
                                                            }
                                                        ];

                                                        return konfigurasjonEntry;
                                                    })
                                                )
                                            }
                                        }
                                    }))
                                }
                                size="small"
                                legend="Endepunkter"
                            >
                                {Object.entries(
                                    utviklerInnstillinger.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon
                                )
                                    .sort((a, b) => {
                                        return a[0].localeCompare(b[0]);
                                    })
                                    .map(([endepunkt, konfigurasjon]) => (
                                        <HStack key={`endepunkt_konfigurasjon_${endepunkt}`} gap="2">
                                            <Checkbox value={endepunkt}>
                                                <BodyShort as="code" size="small">
                                                    {endepunkt}
                                                </BodyShort>
                                            </Checkbox>
                                            {konfigurasjon.simulerFeil && (
                                                <Select
                                                    value={`${konfigurasjon.statuskode ?? 400}`}
                                                    size="small"
                                                    label="Statuskode"
                                                    hideLabel
                                                    onChange={(e) =>
                                                        setUtviklerInnstillinger((prevState) => ({
                                                            ...prevState,
                                                            innstillinger: {
                                                                ...prevState.innstillinger,
                                                                simulerEndepunktFeil: {
                                                                    ...prevState.innstillinger.simulerEndepunktFeil,
                                                                    endepunktKonfigurasjon: {
                                                                        ...prevState.innstillinger.simulerEndepunktFeil
                                                                            .endepunktKonfigurasjon,
                                                                        [endepunkt]: {
                                                                            ...prevState.innstillinger
                                                                                .simulerEndepunktFeil
                                                                                .endepunktKonfigurasjon[
                                                                                endepunkt as Endepunkt
                                                                            ],
                                                                            statuskode: Number.parseInt(e.target.value)
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }))
                                                    }
                                                >
                                                    <optgroup label="HTTP 4XX">
                                                        {feilkoder['4XX'].map((feilkode) => (
                                                            <option
                                                                key={`feilkode_option_${feilkode}`}
                                                                value={`${feilkode}`}
                                                            >
                                                                {feilkode}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                    <optgroup label="HTTP 5XX">
                                                        {feilkoder['5XX'].map((feilkode) => (
                                                            <option
                                                                key={`feilkode_option_${feilkode}`}
                                                                value={`${feilkode}`}
                                                            >
                                                                {feilkode}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                </Select>
                                            )}
                                        </HStack>
                                    ))}
                            </CheckboxGroup>
                        )}
                        <HStack gap="2">
                            <Button
                                onClick={() => {
                                    lagreUtviklerinnstillinger(utviklerInnstillinger);
                                    window.location.reload();
                                }}
                                size="small"
                            >
                                Lagre innstillinger
                            </Button>
                            <Button
                                onClick={() => {
                                    slettUtviklerinnstillinger();
                                    window.location.reload();
                                }}
                                size="small"
                                variant="danger"
                            >
                                Slett innstillinger
                            </Button>
                        </HStack>
                    </VStack>
                </Popover.Content>
            </Popover>
        </>
    );
};
