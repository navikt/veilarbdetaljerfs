import Nokkelinfo from './components/nokkelinfo';
import Oppfolgning from './components/oppfolgning';
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
                    <Oppfolgning />
                </div>
            </StoreProvider>
        </main>
    );
};

export default App;
