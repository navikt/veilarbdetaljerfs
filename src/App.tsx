import Nokkelinfo from './components/nokkelinfo';
import { Registrering } from './components/registreringsInfo';
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
                    <InfoBoks />
                    <Registrering />
                </div>
            </StoreProvider>
        </main>
    );
};

export default App;
