import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import { PilotAlert } from './components/pilotAlert';
import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';
import { Button, Chips } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { useOverblikkFilter } from './data/api/fetch';
import { TrashIcon, CheckmarkIcon } from '@navikt/aksel-icons';
import { logChips } from './utils/logger';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const overblikkFilter = useOverblikkFilter();

    const informasjonsboksAlternativer = ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'];
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

    const lagredeKnappAktiv = valgteInformasjonsbokser.sort() !== lagredeInformasjonsbokser.sort();

    return (
        <main className="app veilarbdetaljerfs">
            <div className="overblikk">
                <StoreProvider fnr={props.fnr}>
                    <PilotAlert />
                    <Nokkelinfo />

                    <div className="overblikkChips">
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
                                        logChips(valgteInformasjonsbokser);
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
        </main>
    );
};

export default App;
