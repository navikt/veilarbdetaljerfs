import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Nokkelinfo from './components/nokkelinfo';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';

import StoreProvider from './stores/store-provider';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    return (
        <main className="app veilarbdetaljerfs">
            <StoreProvider fnr={props.fnr}>
                <Nokkelinfo />
                <div className="main_grid">
                    <CvInnhold />
                    <Jobbonsker />
                    <Registrering />
                    <Oppfolging />
                    <PersonaliaBoks />
                    <Ytelser />
                </div>
            </StoreProvider>
        </main>
    );
};

export default App;
