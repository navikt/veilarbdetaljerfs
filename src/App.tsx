import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import Cvinnhold from './components/cv-innhold';
import Jobbonskerinnhold from './components/jobbonsker-innhold';
import Oppfolgingsinnhold from './components/oppfolging-innhold';
import Personaliainnhold from './components/personalia-innhold';
import Registreringsinnhold from './components/registrering-innhold';
import Ytelsesinnhold from './components/ytelser-innhold';
import { Alert, Button, Chips, Heading, Panel } from '@navikt/ds-react';
import { useEffect, useMemo, useState } from 'react';
import { sendOverblikkFilter, useOverblikkFilter } from './data/api/fetch';
import { SWRConfig } from 'swr';
import TilToppenKnapp from './components/felles/til-toppen-knapp';
import { trackAmplitude } from './amplitude/amplitude';
import '../index.css';

export interface AppProps {
    fnr?: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const overblikkFilter = useOverblikkFilter();

    const informasjonsboksAlternativer: string[] = useMemo(
        () => ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'],
        []
    );

    const [valgteInformasjonsbokser, setValgteInformasjonsbokser] = useState<string[]>(informasjonsboksAlternativer);
    const [visLagreInfo, setVisLagreInfo] = useState<boolean>(false);
    const [visLagreFeil, setVisLagreFeil] = useState<boolean>(false);

    useEffect(() => {
        if (overblikkFilter.data !== undefined && overblikkFilter.data.overblikkVisning !== undefined) {
            const lagretData = overblikkFilter.data.overblikkVisning;
            if (lagretData.length > 0) {
                setValgteInformasjonsbokser(lagretData);
            } else {
                setValgteInformasjonsbokser(informasjonsboksAlternativer);
            }
        }
    }, [informasjonsboksAlternativer, overblikkFilter.data]);

    const mapNavnTilKomponent = (navn: string) => {
        switch (navn) {
            case 'CV':
                return <Cvinnhold />;
            case 'Jobbønsker':
                return <Jobbonskerinnhold />;
            case 'Oppfølging':
                return <Oppfolgingsinnhold />;
            case 'Personalia':
                return <Personaliainnhold />;
            case 'Registrering':
                return <Registreringsinnhold />;
            case 'Ytelser':
                return <Ytelsesinnhold />;
            default:
                return null;
        }
    };

    return (
        <main className="app veilarbdetaljerfs">
            <SWRConfig
                value={{
                    shouldRetryOnError: false,
                    revalidateIfStale: false,
                    revalidateOnFocus: false,
                    revalidateOnReconnect: false
                }}
            >
                <div className="overblikk">
                    <StoreProvider fnr={props.fnr}>
                        <Nokkelinfo />
                        <section className="overblikk_chips">
                            <Chips size="small">
                                {valgteInformasjonsbokser.map((alternativ) => (
                                    <Chips.Toggle
                                        key={alternativ}
                                        selected={true}
                                        onClick={() => {
                                            setVisLagreInfo(false);
                                            setVisLagreFeil(false);
                                            setValgteInformasjonsbokser(
                                                valgteInformasjonsbokser.filter((item) => item !== alternativ)
                                            );
                                            trackAmplitude(
                                                {
                                                    name: 'filtervalg',
                                                    data: { kategori: alternativ, filternavn: 'oyblikksvisning' }
                                                },
                                                {
                                                    harTidligereLagret: !!overblikkFilter.data?.overblikkVisning,
                                                    valgt: false
                                                }
                                            );
                                        }}
                                        variant="neutral"
                                    >
                                        {alternativ}
                                    </Chips.Toggle>
                                ))}

                                {informasjonsboksAlternativer
                                    .filter((x) => !valgteInformasjonsbokser.includes(x))
                                    .map((alternativ) => (
                                        <Chips.Toggle
                                            key={alternativ}
                                            selected={false}
                                            onClick={() => {
                                                setVisLagreInfo(false);
                                                setVisLagreFeil(false);
                                                setValgteInformasjonsbokser((prevState) => [...prevState, alternativ]);
                                                trackAmplitude(
                                                    {
                                                        name: 'filtervalg',
                                                        data: { kategori: alternativ, filternavn: 'oyblikksvisning' }
                                                    },
                                                    {
                                                        harTidligereLagret: !!overblikkFilter.data?.overblikkVisning,
                                                        valgt: true
                                                    }
                                                );
                                            }}
                                            variant="neutral"
                                        >
                                            {alternativ}
                                        </Chips.Toggle>
                                    ))}
                            </Chips>
                            <Button
                                onClick={() => {
                                    setVisLagreInfo(false);
                                    setVisLagreFeil(false);
                                    setValgteInformasjonsbokser(informasjonsboksAlternativer);
                                    trackAmplitude(
                                        {
                                            name: 'filtervalg',
                                            data: { kategori: 'nullstill', filternavn: 'oyblikksvisning' }
                                        },
                                        { harTidligereLagret: !!overblikkFilter.data?.overblikkVisning }
                                    );
                                }}
                                size="small"
                                variant="tertiary"
                            >
                                Nullstill visning
                            </Button>

                            <Button
                                onClick={() => {
                                    sendOverblikkFilter({ overblikkVisning: valgteInformasjonsbokser }).then(
                                        () => {
                                            trackAmplitude(
                                                {
                                                    name: 'filtervalg',
                                                    data: { kategori: 'lagret visning', filternavn: 'oyblikksvisning' }
                                                },
                                                {
                                                    valgt: valgteInformasjonsbokser,
                                                    harTidligereLagret: !!overblikkFilter.data?.overblikkVisning
                                                }
                                            );
                                            overblikkFilter.reFetch().then(
                                                () => {
                                                    setVisLagreFeil(false);
                                                    setVisLagreInfo(true);
                                                },
                                                () => {
                                                    setVisLagreInfo(false);
                                                    setVisLagreFeil(true);
                                                }
                                            );
                                        },
                                        () => {
                                            setVisLagreInfo(false);
                                            setVisLagreFeil(true);
                                        }
                                    );
                                }}
                                size="small"
                                variant="secondary"
                            >
                                Lagre visning
                            </Button>
                            {visLagreInfo ? (
                                <Alert variant="success" role="status" inline size="small">
                                    Visning er lagret!
                                </Alert>
                            ) : null}
                            {visLagreFeil ? (
                                <Alert variant="error" role="status" inline size="small">
                                    Kunne ikke lagre. Prøv på nytt senere.
                                </Alert>
                            ) : null}
                        </section>

                        <section className="main_grid">
                            {valgteInformasjonsbokser.map((valgtInformasjonsboks) => (
                                <Panel
                                    border
                                    className="info_panel"
                                    key={valgtInformasjonsboks}
                                    id={`${valgtInformasjonsboks}-panel`}
                                >
                                    <Heading spacing level="2" size="medium" className="panel_header">
                                        {valgtInformasjonsboks}
                                    </Heading>
                                    {mapNavnTilKomponent(valgtInformasjonsboks)}
                                </Panel>
                            ))}
                        </section>
                    </StoreProvider>
                </div>
            </SWRConfig>
            <TilToppenKnapp />
        </main>
    );
};

export default App;
