import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import Overblikk from './components/overblikk';
import StoreProvider from './stores/store-provider';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    return (
        <main className="app veilarbdetaljerfs">
            <StoreProvider fnr={props.fnr}>
                <Overblikk />
                <div className='mainGrid'>
                </div>
            </StoreProvider>
        </main>
    );
};

export default App;
