import { ChangeEvent, Reducer, useReducer, useRef, useState } from 'react';
import { BodyShort, Button, Checkbox, CheckboxGroup, HStack, Popover, Select, VStack } from '@navikt/ds-react';
import './utviklerinnstillinger.css';
import {
    EndepunktKonfigurasjon,
    hentUtviklerInnstillinger,
    lagreUtviklerinnstillinger,
    slettUtviklerinnstillinger,
    statuskoder,
    UTVIKLER_INNSTILLINGER_VERSJON,
    UtviklerInnstillingerSpesifikk
} from './utviklerinnstillinger.ts';
import { Endepunkt, endepunkter } from '../../data/api/fetch.ts';

const utviklerInnstillingerDefaultState: UtviklerInnstillingerSpesifikk = {
    versjon: UTVIKLER_INNSTILLINGER_VERSJON,
    innstillinger: {
        simulerEndepunktRespons: {
            endepunktKonfigurasjon: Object.fromEntries(
                Object.values(endepunkter).map((endepunkt) => {
                    // Denne const-en er med hensikt ikkje inlina for at vi skal få typesjekking
                    const konfigurasjonEntry = [
                        endepunkt,
                        {
                            endepunkt: endepunkt,
                            overstyrRespons: false,
                            respons: null
                        }
                    ] satisfies [Endepunkt, EndepunktKonfigurasjon];

                    return konfigurasjonEntry;
                })
            ) as Record<Endepunkt, EndepunktKonfigurasjon>
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
                    simulerEndepunktRespons: {
                        ...state.innstillinger.simulerEndepunktRespons,
                        endepunktKonfigurasjon: Object.fromEntries(
                            Object.entries(state.innstillinger.simulerEndepunktRespons.endepunktKonfigurasjon).map(
                                ([endepunkt, konfigurasjon]) => {
                                    // Denne const-en er med hensikt ikkje inlina for at vi skal få typesjekking
                                    const konfigurasjonEntry = [
                                        endepunkt,
                                        {
                                            endepunkt: konfigurasjon.endepunkt,
                                            overstyrRespons: action.data.valgteEndepunkter.some(
                                                (valgtEndepunkt) => endepunkt === valgtEndepunkt
                                            ),
                                            respons: action.data.valgteEndepunkter.some(
                                                (valgtEndepunkt) => endepunkt === valgtEndepunkt
                                            )
                                                ? konfigurasjon?.respons
                                                : null
                                        }
                                    ];

                                    return konfigurasjonEntry;
                                }
                            )
                        )
                    }
                }
            } satisfies UtviklerInnstillingerSpesifikk;
        }
        case 'ENDEPUNKT_KONFIGURASJON_ENDRET': {
            return {
                ...state,
                innstillinger: {
                    ...state.innstillinger,
                    simulerEndepunktRespons: {
                        ...state.innstillinger.simulerEndepunktRespons,
                        endepunktKonfigurasjon: {
                            ...state.innstillinger.simulerEndepunktRespons.endepunktKonfigurasjon,
                            [action.data.endepunkt]: {
                                ...state.innstillinger.simulerEndepunktRespons.endepunktKonfigurasjon[
                                    action.data.endepunkt as Endepunkt
                                ],
                                respons: {
                                    status: action.data.konfigurasjon.statuskode
                                }
                            }
                        }
                    }
                }
            } satisfies UtviklerInnstillingerSpesifikk;
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

    const handleValgteEndepunkterEndret = (valgteEndepunkter: Endepunkt[]) => {
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
                                utviklerInnstillinger.innstillinger.simulerEndepunktRespons.endepunktKonfigurasjon
                            )
                                .filter((konfigurasjonEntry) => konfigurasjonEntry[1].overstyrRespons)
                                .map(([endepunkt]) => endepunkt)}
                            onChange={handleValgteEndepunkterEndret}
                            size="small"
                            legend="Simuler HTTP-respons i endepunkter"
                        >
                            {Object.entries(
                                utviklerInnstillinger.innstillinger.simulerEndepunktRespons.endepunktKonfigurasjon
                            )
                                .sort(([endepunkt_a], [endepunkt_b]) => endepunkt_a.localeCompare(endepunkt_b))
                                .map(([endepunkt, konfigurasjon]) => (
                                    <HStack key={`endepunkt_konfigurasjon_${endepunkt}`} gap="2">
                                        <Checkbox value={endepunkt}>
                                            <BodyShort as="code" size="small">
                                                {endepunkt}
                                            </BodyShort>
                                        </Checkbox>
                                        {konfigurasjon.overstyrRespons && (
                                            <Select
                                                value={`${konfigurasjon?.respons?.status ?? 200}`}
                                                size="small"
                                                label="Statuskode"
                                                hideLabel
                                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                                    handleEndepunktKonfigurasjonEndret(e, endepunkt as Endepunkt)
                                                }
                                            >
                                                <optgroup label="HTTP 2XX">
                                                    {statuskoder['2XX'].map((statuskode) => (
                                                        <option
                                                            key={`statuskode_option_${statuskode}`}
                                                            value={`${statuskode}`}
                                                        >
                                                            {statuskode}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                                <optgroup label="HTTP 4XX">
                                                    {statuskoder['4XX'].map((statuskode) => (
                                                        <option
                                                            key={`statuskode_option_${statuskode}`}
                                                            value={`${statuskode}`}
                                                        >
                                                            {statuskode}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                                <optgroup label="HTTP 5XX">
                                                    {statuskoder['5XX'].map((statuskode) => (
                                                        <option
                                                            key={`statuskode_option_${statuskode}`}
                                                            value={`${statuskode}`}
                                                        >
                                                            {statuskode}
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
