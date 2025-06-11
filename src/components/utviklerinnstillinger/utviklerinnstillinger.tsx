import { ChangeEvent, Reducer, useReducer, useRef, useState } from 'react';
import { BodyShort, Button, Checkbox, CheckboxGroup, HStack, Popover, Select, VStack } from '@navikt/ds-react';
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

const utviklerInnstillingerDefaultState: UtviklerInnstillingerSpesifikk = {
    versjon: UTVIKLER_INNSTILLINGER_VERSJON,
    innstillinger: {
        simulerEndepunktFeil: {
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

type UtviklerInnstillingerAction =
    | {
          type: 'VALGTE_ENDEPUNKTER_ENDRET';
          data: { valgteEndepunkter: Endepunkt[] };
      }
    | {
          type: 'ENDEPUNKT_KONFIGURASJON_ENDRET';
          data: {
              endepunkt: Endepunkt;
              konfigurasjon: {
                  statuskode: number;
              };
          };
      }
    | {
          type: 'OVERSKRIV_INNSTILLINGER';
          data: { nyState: UtviklerInnstillingerSpesifikk };
      };

const utviklerInnstillingerReducer = (state: UtviklerInnstillingerSpesifikk, action: UtviklerInnstillingerAction) => {
    switch (action.type) {
        case 'VALGTE_ENDEPUNKTER_ENDRET': {
            return {
                ...state,
                innstillinger: {
                    ...state.innstillinger,
                    simulerEndepunktFeil: {
                        ...state.innstillinger.simulerEndepunktFeil,
                        endepunktKonfigurasjon: Object.fromEntries(
                            Object.entries(state.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon).map(
                                ([endepunkt, konfigurasjon]) => {
                                    const konfigurasjonEntry = [
                                        endepunkt,
                                        {
                                            endepunkt: konfigurasjon.endepunkt,
                                            simulerFeil: action.data.valgteEndepunkter.some(
                                                (valgtEndepunkt) => endepunkt === valgtEndepunkt
                                            ),
                                            statuskode: action.data.valgteEndepunkter.some(
                                                (valgtEndepunkt) => endepunkt === valgtEndepunkt
                                            )
                                                ? konfigurasjon.statuskode
                                                : null
                                        }
                                    ];

                                    return konfigurasjonEntry;
                                }
                            )
                        )
                    }
                }
            };
        }
        case 'ENDEPUNKT_KONFIGURASJON_ENDRET': {
            return {
                ...state,
                innstillinger: {
                    ...state.innstillinger,
                    simulerEndepunktFeil: {
                        ...state.innstillinger.simulerEndepunktFeil,
                        endepunktKonfigurasjon: {
                            ...state.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon,
                            [action.data.endepunkt]: {
                                ...state.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon[
                                    action.data.endepunkt as Endepunkt
                                ],
                                statuskode: action.data.konfigurasjon.statuskode
                            }
                        }
                    }
                }
            };
        }
        case 'OVERSKRIV_INNSTILLINGER':
            return action.data.nyState;
        default:
            return state;
    }
};

export const Utviklerinnstillinger = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openState, setOpenState] = useState(false);

    const [lagredeUtviklerInnstillinger] = useState<UtviklerInnstillingerSpesifikk | null>(hentUtviklerInnstillinger);
    const [utviklerInnstillinger, utviklerInnstillingerDispatch] = useReducer<
        Reducer<UtviklerInnstillingerSpesifikk, UtviklerInnstillingerAction>
    >(utviklerInnstillingerReducer, lagredeUtviklerInnstillinger ?? utviklerInnstillingerDefaultState);

    const handleSimulerEndepunktFeilEndret = (valgteEndepunkter: Endepunkt[]) => {
        utviklerInnstillingerDispatch({ type: 'VALGTE_ENDEPUNKTER_ENDRET', data: { valgteEndepunkter } });
    };

    const handleEndepunktKonfigurasjonEndret = (e: ChangeEvent<HTMLSelectElement>, endepunkt: Endepunkt) => {
        utviklerInnstillingerDispatch({
            type: 'ENDEPUNKT_KONFIGURASJON_ENDRET',
            data: { endepunkt, konfigurasjon: { statuskode: Number.parseInt(e.target.value) } }
        });
    };

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
                    const lagretUtviklerInnstillinger = hentUtviklerInnstillinger();

                    setOpenState(false);
                    if (utviklerInnstillinger !== lagretUtviklerInnstillinger) {
                        utviklerInnstillingerDispatch({
                            type: 'OVERSKRIV_INNSTILLINGER',
                            data: {
                                nyState: lagretUtviklerInnstillinger ?? utviklerInnstillingerDefaultState
                            }
                        });
                    }
                }}
                anchorEl={buttonRef.current}
            >
                <Popover.Content>
                    <VStack gap="4">
                        <CheckboxGroup
                            value={Object.entries(
                                utviklerInnstillinger.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon
                            )
                                .filter((konfigurasjonEntry) => konfigurasjonEntry[1].simulerFeil)
                                .map(([endepunkt]) => endepunkt)}
                            onChange={handleSimulerEndepunktFeilEndret}
                            size="small"
                            legend="Simuler HTTP-feil i endepunkter"
                        >
                            {Object.entries(
                                utviklerInnstillinger.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon
                            )
                                .sort(([endepunkt_a], [endepunkt_b]) => endepunkt_a.localeCompare(endepunkt_b))
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
                                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                                    handleEndepunktKonfigurasjonEndret(e, endepunkt as Endepunkt)
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
