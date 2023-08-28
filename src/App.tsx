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
import { TrashIcon } from '@navikt/aksel-icons';
import { SWRConfig } from 'swr';

export interface AppProps {
    fnr: string;
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
    const [visNullstillInfo, setVisNullstillInfo] = useState<boolean>(false);

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
                            <Chips size="small" aria-live="polite">
                                {valgteInformasjonsbokser.map((alternativ) => (
                                    <Chips.Toggle
                                        key={alternativ}
                                        selected={true}
                                        onClick={() => {
                                            setVisNullstillInfo(false);
                                            setVisLagreInfo(false);
                                            setVisLagreFeil(false);
                                            setValgteInformasjonsbokser(
                                                valgteInformasjonsbokser.filter((item) => item !== alternativ)
                                            );
                                        }}
                                        variant="neutral"
                                        aria-label={alternativ + '-panel valgt'}
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
                                                setVisNullstillInfo(false);
                                                setVisLagreInfo(false);
                                                setVisLagreFeil(false);
                                                setValgteInformasjonsbokser((prevState) => [...prevState, alternativ]);
                                            }}
                                            variant="neutral"
                                            aria-label={alternativ + '-panel fjernet'}
                                        >
                                            {alternativ}
                                        </Chips.Toggle>
                                    ))}
                            </Chips>
                            <Button
                                onClick={() => {
                                    setVisNullstillInfo(true);
                                    setVisLagreInfo(false);
                                    setVisLagreFeil(false);
                                    setValgteInformasjonsbokser(informasjonsboksAlternativer);
                                }}
                                size="small"
                                variant="tertiary"
                                icon={<TrashIcon title="a11y-title" />}
                            >
                                Nullstill visning
                            </Button>

                            <Button
                                onClick={() => {
                                    sendOverblikkFilter({ overblikkVisning: valgteInformasjonsbokser }).then(
                                        () => {
                                            overblikkFilter.reFetch().then(
                                                () => {
                                                    setVisNullstillInfo(false);
                                                    setVisLagreFeil(false);
                                                    setVisLagreInfo(true);
                                                },
                                                () => {
                                                    setVisNullstillInfo(false);
                                                    setVisLagreInfo(false);
                                                    setVisLagreFeil(true);
                                                }
                                            );
                                        },
                                        () => {
                                            setVisNullstillInfo(false);
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
                            {visNullstillInfo ? (
                                <Alert variant="success" role="status" inline size="small">
                                    Visning nullstilt!
                                </Alert>
                            ) : null}
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
                                <Panel border className="info_panel" key={valgtInformasjonsboks}>
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
        </main>
    );
};

export default App;
