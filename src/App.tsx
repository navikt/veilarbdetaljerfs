import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import { PilotAlert } from './components/pilotAlert';
import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => (
    <main className="app veilarbdetaljerfs">
        <div className="overblikk">
            <StoreProvider fnr={props.fnr}>
                <PilotAlert />
                <Nokkelinfo />
                <div className="main_grid">
                    <CvInnhold />
                    <Jobbonsker />
                    <Oppfolging />
                    <PersonaliaBoks />
                    <Registrering />
                    <Ytelser />
                </div>
            </StoreProvider>
        </div>
    </main>
);

export default App;
