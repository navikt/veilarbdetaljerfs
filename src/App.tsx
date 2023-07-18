import Nokkelinfo from './components/nokkelinfo';
import StoreProvider from './stores/store-provider';
import { PilotAlert } from './components/pilotAlert';
import CvInnhold from './components/cv-innhold';
import Jobbonsker from './components/jobbonsker';
import Oppfolging from './components/oppfolging';
import PersonaliaBoks from './components/personalia-boks';
import { Registrering } from './components/registreringsInfo';
import { Ytelser } from './components/ytelserinfo';
import { useEffect, useState } from 'react';
import { ArenaPerson } from './data/api/datatyper/arenaperson';
import { ReturnData, hentCvOgJobbonsker } from './data/api/fetch';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

const App = (props: AppProps) => {
    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [cvOgJobbonsker, setCvOgJobbonsker] = useState<ReturnData<ArenaPerson> | null>(null);

    useEffect(() => {
        const hentCvData = async () => {
            try {
                setLasterData(true);
                const _cvOgJobbonsker = await hentCvOgJobbonsker(props.fnr);

                setCvOgJobbonsker(_cvOgJobbonsker);
            } catch (error) {
                setHarFeil(true);
            } finally {
                setLasterData(false);
            }
        };

        hentCvData();
    }, [props.fnr]);

    return (
        <main className="app veilarbdetaljerfs">
            <StoreProvider fnr={props.fnr}>
                <PilotAlert />
                <Nokkelinfo />
                <div className="main_grid">
                    <CvInnhold cvOgJobbonsker={cvOgJobbonsker} lasterDataCV={lasterData} harFeilCV={harFeil} />
                    <Jobbonsker />
                    <Oppfolging />
                    <PersonaliaBoks />
                    <Registrering />
                    <Ytelser />
                </div>
            </StoreProvider>
        </main>
    );
};

export default App;
