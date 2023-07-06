import { InfoBoks } from './components/infoboks';
import Nokkelinfo from './components/nokkelinfo';
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
                </div>
            </StoreProvider>
        </main>
    );
};

export default App;
