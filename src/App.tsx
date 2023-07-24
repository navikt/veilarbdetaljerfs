import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import { PilotAlert } from './components/pilotAlert';
import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';
import { Chips } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { useChips } from './data/api/fetch';
import { LagreChips, NullstillChips } from './components/felles/chipsknapp';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const chipsData = useChips();

    const informasjonsboksAlternativer = ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'];
    const [valgteInformasjonsbokser, setValgteInformasjonsbokser] = useState<string[]>(informasjonsboksAlternativer);
    const [lagredeChips, setLagredeChips] = useState<string[]>(informasjonsboksAlternativer);

    useEffect(() => {
        if (chipsData.data) {
            setValgteInformasjonsbokser(chipsData.data);
            setLagredeChips(chipsData.data);
        }
    }, [chipsData.data]);

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

    return (
        <main className="app veilarbdetaljerfs">
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
                        <NullstillChips
                            alleChips={informasjonsboksAlternativer}
                            setState={setValgteInformasjonsbokser}
                        />

                        <LagreChips aktiveChips={valgteInformasjonsbokser} lagret={lagredeChips} />
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
        </main>
    );
};

export default App;
