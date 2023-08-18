import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';
import { Alert, BodyShort, Button, Chips, Heading } from '@navikt/ds-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
    const [avmerketInformasjonsbokser, setAvmerketInformasjonsbokser] = useState<string[]>([]);

    const [lagredeInformasjonsbokser, setLagredeInformasjonsbokser] = useState<string[]>(informasjonsboksAlternativer);
    const [visLagreInfo, setVisLagreInfo] = useState<boolean>(false);

    const setInitielState = useCallback(
        (informasjonbokser: string[]) => {
            setValgteInformasjonsbokser(informasjonbokser);
            setAvmerketInformasjonsbokser(informasjonsboksAlternativer.filter((x) => !informasjonbokser.includes(x)));
        },
        [informasjonsboksAlternativer]
    );

    useEffect(() => {
        if (!overblikkFilter.isLoading && overblikkFilter.data && overblikkFilter.error?.status === 204) {
            setVisLagreInfo(true);
            setLagredeInformasjonsbokser(overblikkFilter.data.overblikkVisning);
        }
    }, [overblikkFilter.data, overblikkFilter.error, overblikkFilter.isLoading]);

    const toggleComponent = (komponentNavn: string) => {
        setVisLagreInfo(false);
        if (valgteInformasjonsbokser.includes(komponentNavn)) {
            setValgteInformasjonsbokser(valgteInformasjonsbokser.filter((x) => x !== komponentNavn));
            avmerketInformasjonsbokser.unshift(komponentNavn);
            setAvmerketInformasjonsbokser(avmerketInformasjonsbokser);
        } else {
            setAvmerketInformasjonsbokser(avmerketInformasjonsbokser.filter((x) => x !== komponentNavn));
            valgteInformasjonsbokser.push(komponentNavn);
            setValgteInformasjonsbokser(valgteInformasjonsbokser);
        }
    };

    const mapNavnTilKomponent = (navn: string) => {
        switch (navn) {
            case 'CV':
                return <CvInnhold />;
            case 'Jobbønsker':
                return <Jobbonsker />;
            case 'Oppfølging':
                return <Oppfolging />;
            case 'Personalia':
                return <PersonaliaBoks />;
            case 'Registrering':
                return <Registrering />;
            case 'Ytelser':
                return <Ytelser />;
            default:
                return null;
        }
    };

    return (
        <main className="app veilarbdetaljerfs">
            <SWRConfig>
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
                        <div className="overblikk_chips">
                            <Chips size={'small'}>
                                {valgteInformasjonsbokser.map((alternativ) => (
                                    <Chips.Toggle
                                        key={alternativ}
                                        selected={true}
                                        onClick={() => toggleComponent(alternativ)}
                                        variant={'neutral'}
                                    >
                                        {alternativ}
                                    </Chips.Toggle>
                                ))}

                                {avmerketInformasjonsbokser.map((alternativ) => (
                                    <Chips.Toggle
                                        key={alternativ}
                                        selected={false}
                                        onClick={() => toggleComponent(alternativ)}
                                    >
                                        {alternativ}
                                    </Chips.Toggle>
                                ))}

                                <Button
                                    onClick={() => setInitielState(lagredeInformasjonsbokser)}
                                    size="small"
                                    variant="tertiary"
                                    icon={<TrashIcon title="a11y-title" />}
                                >
                                    Nullstill visning
                                </Button>

                                <Button
                                    onClick={() => {
                                        sendOverblikkFilter({ overblikkVisning: valgteInformasjonsbokser });
                                        // Sender og fetcher parallelt? conditional fetching etter POST?
                                        overblikkFilter.reFetch();
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
                        </div>

                        <section className="main_grid" aria-live={'polite'}>
                            {valgteInformasjonsbokser.map((valgtInformasjonsboks) => (
                                <div key={valgtInformasjonsboks} className="box">
                                    {mapNavnTilKomponent(valgtInformasjonsboks)}
                                </div>
                            ))}
                        </section>
                    </StoreProvider>
                </div>
            </SWRConfig>
        </main>
    );
};

export default App;
