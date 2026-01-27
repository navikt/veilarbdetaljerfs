import { useEffect, useMemo, useState } from 'react';
import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import Cvinnhold from './components/cv-innhold';
import Jobbonskerinnhold from './components/jobbonsker-innhold';
import Oppfolgingsinnhold from './components/oppfolging-innhold';
import Personaliainnhold from './components/personalia-innhold';
import Registreringsinnhold from './components/registrering-innhold';
import Ytelsesinnhold from './components/ytelser-innhold';
import TilToppenKnapp from './components/felles/til-toppen-knapp';
import PersonverninformasjonManuell from './components/registrering/arbeidssoekerregistrering/personverninformasjon-manuell';
import { sendOverblikkFilter, useOverblikkFilter } from './data/api/fetch';
import { SWRConfig } from 'swr';
import { Alert, Box, Button, Chips, Heading, Theme } from '@navikt/ds-react';
import '../index.css';
import { Tilgangssjekk } from './Tilgangssjekk';

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

    /** For å slippe å oppdatere storage i nettlesarane til alle brukarane
     * endrar vi berre visningsteksten på Ytelser-chip og boks i staden. */
    const finnVisningstekstForAlternativ = (alternativ: string) => {
        if (alternativ === 'Ytelser') {
            return 'Ytelser (Arena)';
        }
        return alternativ;
    };

    const [valgteInformasjonsbokser, setValgteInformasjonsbokser] = useState<string[]>(informasjonsboksAlternativer);
    const [visLagreInfo, setVisLagreInfo] = useState<boolean>(false);
    const [visLagreFeil, setVisLagreFeil] = useState<boolean>(false);

    useEffect(() => {
        if (overblikkFilter.data !== undefined && overblikkFilter.data.overblikkVisning !== undefined) {
            const lagretData = overblikkFilter.data.overblikkVisning;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setValgteInformasjonsbokser(lagretData);
        }
    }, [overblikkFilter.data]);

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
        <Theme theme="light">
            <main className="app veilarbdetaljerfs">
                <SWRConfig
                    value={{
                        shouldRetryOnError: false,
                        revalidateIfStale: true,
                        revalidateOnFocus: false,
                        revalidateOnReconnect: true
                    }}
                >
                    <div className="overblikk">
                        <Tilgangssjekk fnr={props.fnr}>
                            <StoreProvider fnr={props.fnr}>
                                <Nokkelinfo />
                                <section className="overblikk_chips">
                                    <Chips size="small">
                                        {valgteInformasjonsbokser.map((alternativ) => (
                                            <Chips.Toggle
                                                data-color="neutral"
                                                key={alternativ}
                                                selected={true}
                                                onClick={() => {
                                                    setVisLagreInfo(false);
                                                    setVisLagreFeil(false);
                                                    setValgteInformasjonsbokser(
                                                        valgteInformasjonsbokser.filter((item) => item !== alternativ)
                                                    );
                                                }}
                                            >
                                                {finnVisningstekstForAlternativ(alternativ)}
                                            </Chips.Toggle>
                                        ))}

                                        {informasjonsboksAlternativer
                                            .filter((x) => !valgteInformasjonsbokser.includes(x))
                                            .map((alternativ) => (
                                                <Chips.Toggle
                                                    data-color="neutral"
                                                    key={alternativ}
                                                    selected={false}
                                                    onClick={() => {
                                                        setVisLagreInfo(false);
                                                        setVisLagreFeil(false);
                                                        setValgteInformasjonsbokser((prevState) => [
                                                            ...prevState,
                                                            alternativ
                                                        ]);
                                                    }}
                                                >
                                                    {finnVisningstekstForAlternativ(alternativ)}
                                                </Chips.Toggle>
                                            ))}
                                    </Chips>
                                    <Button
                                        onClick={() => {
                                            setVisLagreInfo(false);
                                            setVisLagreFeil(false);
                                            setValgteInformasjonsbokser(informasjonsboksAlternativer);
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
                                        Lagre visning for alle brukere
                                    </Button>
                                    {visLagreInfo ? (
                                        <Alert variant="success" role="status" inline size="small">
                                            Visning er lagret. Du vil se de samme boksene på alle brukere.
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
                                        <Box
                                            borderRadius="8"
                                            padding="space-16"
                                            marginBlock="auto space-32"
                                            className="info_panel"
                                            key={valgtInformasjonsboks}
                                            id={`${valgtInformasjonsboks}-panel`}
                                        >
                                            <Heading spacing level="2" size="medium" className="panel_header">
                                                {finnVisningstekstForAlternativ(valgtInformasjonsboks)}
                                            </Heading>
                                            {mapNavnTilKomponent(valgtInformasjonsboks)}
                                        </Box>
                                    ))}
                                </section>
                            </StoreProvider>
                        </Tilgangssjekk>
                    </div>
                </SWRConfig>
                <TilToppenKnapp />
                <div id="kun_til_printing">
                    <PersonverninformasjonManuell />
                </div>
            </main>
        </Theme>
    );
};

export default App;
