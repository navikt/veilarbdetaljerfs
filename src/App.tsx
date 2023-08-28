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
                <section className="overblikk">
                    <StoreProvider fnr={props.fnr}>
                        <Nokkelinfo />
                        <section className="overblikk_chips">
                            <Chips size="small" aria-live="polite">
                                {valgteInformasjonsbokser.map((alternativ) => (
                                    <Chips.Toggle
                                        key={alternativ}
                                        selected={true}
                                        onClick={() => {
                                            setVisLagreInfo(false);
                                            setValgteInformasjonsbokser(
                                                valgteInformasjonsbokser.filter((item) => item !== alternativ)
                                            );
                                        }}
                                        variant={'neutral'}
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
                                                setVisLagreInfo(false);
                                                setVisLagreFeil(false);
                                                setValgteInformasjonsbokser((prevState) => [...prevState, alternativ]);
                                            }}
                                            variant={'neutral'}
                                            aria-label={alternativ + '-panel fjernet'}
                                        >
                                            {alternativ}
                                        </Chips.Toggle>
                                    ))}
                            </Chips>
                            <Button
                                onClick={() => {
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
                                    <Alert variant="success" aria-live={'polite'} inline size="small">
                                        Visning er lagret!
                                    </Alert>
                                ) : null}
                                {visLagreFeil ? (
                                    <Alert variant="error" aria-live={'polite'} inline size="small">
                                        Kunne ikke lagre. Prøv på nytt senere
                                    </Alert>
                                ) : null}
                        </section>

                        <section className="main_grid" aria-live={'polite'}>
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
