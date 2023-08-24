import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import Cvinnhold from './components/cv-innhold';
import Jobbonskerinnhold from './components/jobbonsker-innhold';
import Oppfolgingsinnhold from './components/oppfolging-innhold';
import Personaliainnhold from './components/personalia-innhold';
import Registreringsinnhold from './components/registrering-innhold';
import Ytelsesinnhold from './components/ytelser-innhold';
import { Alert, BodyShort, Button, Chips, Heading, Panel } from '@navikt/ds-react';
import { useEffect, useMemo, useState } from 'react';
import { sendOverblikkFilter, useOverblikkFilter } from './data/api/fetch';
import { TrashIcon, ExternalLinkIcon } from '@navikt/aksel-icons';
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
                        <Alert variant="warning" className="pilot_alert">
                            <Heading spacing size="small" level="3">
                                Testside for Overblikk
                            </Heading>
                            <BodyShort>
                                På denne siden vil det dukke opp nytt innhold fortløpende. Vi setter stor pris på dine
                                tilbakemeldinger, som du kan gi når som helst og så mange ganger du vil via skjemaet
                                under. Takk for at du deltar!
                            </BodyShort>
                            <a href="https://forms.office.com/e/w3jHFRCKEC">
                                Gi tilbakemeldinger i Forms{' '}
                                <ExternalLinkIcon title="Ikon som illustrerer en ekstern lenke" aria-hidden={true} />
                            </a>
                        </Alert>
                        <Nokkelinfo />
                        <Chips size="small" className="overblikk_chips">
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
                                            setValgteInformasjonsbokser((prevState) => [...prevState, alternativ]);
                                        }}
                                        variant={'neutral'}
                                    >
                                        {alternativ}
                                    </Chips.Toggle>
                                ))}

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
                                    sendOverblikkFilter({ overblikkVisning: valgteInformasjonsbokser }).finally(() => {
                                        overblikkFilter.reFetch().then(() => setVisLagreInfo(true));
                                    });
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
                        </Chips>

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
