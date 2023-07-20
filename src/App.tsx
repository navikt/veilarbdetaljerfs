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
import { useState } from 'react';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const options = ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'];

    const [selectedComponents, setSelectedComponents] = useState<string[]>([options[0]]);

    const toggleComponent = (componentName: string) => {
        setSelectedComponents((prevSelected) =>
            prevSelected.includes(componentName)
                ? prevSelected.filter((name) => name !== componentName)
                : [...prevSelected, componentName]
        );
    };

    const renderComponent = (componentName: string) => {
        switch (componentName) {
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

                {/* Chips buttons */}
                <div className="overblikkChips">
                    <Chips>
                        {options.map((c) => (
                            <Chips.Toggle
                                key={c}
                                selected={selectedComponents.includes(c)}
                                onClick={() => toggleComponent(c)}
                            >
                                {c}
                            </Chips.Toggle>
                        ))}
                    </Chips>
                </div>

                {/* Main grid */}
                <div className="main_grid">
                    {selectedComponents.map((selectedComponent) => (
                        <div key={selectedComponent} className="box">
                            {renderComponent(selectedComponent)}
                        </div>
                    ))}
                </div>
            </StoreProvider>
        </main>
    );
};

export default App;
