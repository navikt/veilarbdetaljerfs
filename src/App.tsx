import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';
import { Alert, BodyShort, Chips, Heading } from '@navikt/ds-react';
import { useState } from 'react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const informasjonsboksAlternativer = ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'];

    const [valgteInformasjonsbokser, setValgteInformasjonsbokser] = useState<string[]>(informasjonsboksAlternativer);

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
            <div className="overblikk">
                <StoreProvider fnr={props.fnr}>
                    <Alert variant="warning" className="pilot_alert">
                        <Heading spacing size="small" level="3">
                            Testside for Overblikk
                        </Heading>
                        <BodyShort>
                            På denne siden vil det dukke opp nytt innhold fortløpende. Vi setter stor pris på dine
                            tilbakemeldinger, som du kan gi når som helst og så mange ganger du vil via skjemaet under.
                            Takk for at du deltar!
                        </BodyShort>
                        <a href="https://forms.office.com/e/w3jHFRCKEC">
                            Gi tilbakemeldinger i Forms <ExternalLinkIcon title="a11y-title" />
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
                    </div>
                </StoreProvider>
            </div>
        </main>
    );
};

export default App;
