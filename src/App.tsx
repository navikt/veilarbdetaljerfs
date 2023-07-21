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
import { useChips } from './data/api/fetch';
import { TrashIcon, BookmarkIcon } from '@navikt/aksel-icons';
import { logChips } from './utils/logger';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const chipsData = useChips();

    const options = ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'];
    const [selectedComponents, setSelectedComponents] = useState<string[]>(options);

    useEffect(() => {
        if (chipsData.data) {
            setSelectedComponents(chipsData.data);
            console.log('VALGTE CHIPS:', selectedComponents);
        }
    }, [chipsData.data]);

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
                        <Button
                            onClick={() => setSelectedComponents(options)}
                            size="small"
                            variant="tertiary"
                            icon={<TrashIcon title="a11y-title" />}
                        >
                            Nullstill visning
                        </Button>

                        <Button
                            onClick={() => logChips(selectedComponents)}
                            size="small"
                            variant="secondary"
                            icon={<BookmarkIcon title="a11y-title" />}
                        >
                            Lagre visning
                        </Button>
                    </Chips>
                </div>

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
