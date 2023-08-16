import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';
import { Alert, BodyShort, Button, Chips, Heading } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { sendOverblikkFilter, useOverblikkFilter } from './data/api/fetch';
import { TrashIcon, CheckmarkIcon, ExternalLinkIcon } from '@navikt/aksel-icons';
import { SWRConfig } from 'swr';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const overblikkFilter = useOverblikkFilter();

    const informasjonsboksAlternativer = ['CV', 'Jobbønsker', 'Registrering', 'Oppfølging', 'Ytelser', 'Personalia'];
    const [valgteInformasjonsbokser, setValgteInformasjonsbokser] = useState<string[]>(informasjonsboksAlternativer);
    const [lagredeInformasjonsbokser, setLagredeInformasjonsbokser] = useState<string[]>(informasjonsboksAlternativer);

    useEffect(() => {
        if (overblikkFilter.data && !overblikkFilter.error) {
            setValgteInformasjonsbokser(overblikkFilter.data);
            setLagredeInformasjonsbokser(overblikkFilter.data);
        }
        if (overblikkFilter.error?.status === 204) {
            setLagredeInformasjonsbokser(valgteInformasjonsbokser);
        }
    }, [overblikkFilter.data || overblikkFilter.error]);

    const toggleComponent = (konponentNavn: string) => {
        setValgteInformasjonsbokser((tidligereValgteKomponenter) =>
            tidligereValgteKomponenter.includes(konponentNavn)
                ? tidligereValgteKomponenter.filter((navn) => navn !== konponentNavn)
                : [...tidligereValgteKomponenter, konponentNavn]
        );
    };

    const mapNavnTilKomponent = (navn: string) => {
        switch (navn) {
            case 'CV':
                return <CvInnhold />;
            case 'Jobbønsker':
                return <Jobbonsker />;
            case 'Registrering':
                return <Registrering />;
            case 'Oppfølging':
                return <Oppfolging />;
            case 'Ytelser':
                return <Ytelser />;
            case 'Personalia':
                return <PersonaliaBoks />;
            default:
                return null;
        }
    };

    const lagredeKnappAktiv = valgteInformasjonsbokser.sort() !== lagredeInformasjonsbokser.sort();

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
                        <div className="overblikk_chips">
                            <Chips>
                                {informasjonsboksAlternativer.map((alternativ) => (
                                    <Chips.Toggle
                                        key={alternativ}
                                        selected={valgteInformasjonsbokser.includes(alternativ)}
                                        onClick={() => toggleComponent(alternativ)}
                                    >
                                        {alternativ}
                                    </Chips.Toggle>
                                ))}
                            </Chips>
                        </div>

                        <div className="main_grid">
                            {valgteInformasjonsbokser.map((valgtInformasjonsboks) => (
                                <div key={valgtInformasjonsboks} className="box">
                                    {mapNavnTilKomponent(valgtInformasjonsboks)}
                                </div>
                            ))}

                            <Button
                                onClick={() => setValgteInformasjonsbokser(informasjonsboksAlternativer)}
                                size="small"
                                variant="tertiary"
                                icon={<TrashIcon title="a11y-title" />}
                            >
                                Nullstill visning
                            </Button>

                            {lagredeKnappAktiv ? (
                                <Button
                                    onClick={() => {
                                        sendOverblikkFilter(valgteInformasjonsbokser);
                                        // Sender og fetcher parallelt? conditional fetching etter POST?
                                        overblikkFilter.reFetch();
                                    }}
                                    size="small"
                                    variant="secondary"
                                >
                                    Lagre visning
                                </Button>
                            ) : (
                                <Button
                                    disabled={true}
                                    size="small"
                                    variant="secondary"
                                    icon={<CheckmarkIcon title="a11y-title" />}
                                >
                                    Lagret
                                </Button>
                            )}
                        </Chips>
                    </div>

                    <div className="main_grid">
                        {valgteInformasjonsbokser.map((valgtInformasjonsboks) => (
                            <div key={valgtInformasjonsboks} className="box">
                                {mapNavnTilKomponent(valgtInformasjonsboks)}
                            </div>
                        ))}
                    </div>
                </StoreProvider>
            </div>
            </SWRConfig>
        </main>
    );
};

export default App;
