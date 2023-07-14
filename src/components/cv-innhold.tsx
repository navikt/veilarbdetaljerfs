import { useEffect, useState } from 'react';
import { useAppStore } from '../stores/app-store';
import { ArenaPerson } from '../data/api/datatyper/arenaperson';
import { UnderOppfolgingData } from '../data/api/datatyper/underOppfolgingData';
import { LastNedCV } from './cv/last-ned-cv';
import { RedigerCV } from './cv/rediger-cv';
import { hentCvOgJobbonsker, hentUnderOppfolging } from '../data/api/fetch';
import { Heading, Panel, Alert } from '@navikt/ds-react';
import { Errormelding, Laster } from './felles/minikomponenter';
import SistEndret from './felles/sist-endret';
import Sammendrag from './cv/sammendrag';
import Arbeidserfaring from './cv/arbeidserfaring';
import Utdanning from './cv/utdanning';
import AnnenErfaring from './cv/annen-erfaring';
import Godkjenninger from './cv/godkjenninger';
import AndreGodkjenninger from './cv/andre-godkjenninger';
import Kurs from './cv/kurs';
import Forerkort from './cv/forerkort';
import Sprak from './cv/sprak';
import Kompetanser from './cv/kompetanser';
import Fagdokumentasjoner from './cv/fagdokumentasjoner';
import './fellesStyling.css';

const CvInnhold = () => {
    const { fnr } = useAppStore();
    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [cvOgJobbonsker, setCvOgJobbonsker] = useState<ArenaPerson | null>(null);
    const [underOppfolging, setUnderOppfolging] = useState<UnderOppfolgingData | null>(null);

    useEffect(() => {
        const hentCvData = async () => {
            try {
                setLasterData(true);
                const [_cvOgJobbonsker, _underOppfolging] = await Promise.all([
                    hentCvOgJobbonsker(fnr),
                    hentUnderOppfolging(fnr)
                ]);

                setCvOgJobbonsker(_cvOgJobbonsker);
                setUnderOppfolging(_underOppfolging);
            } catch (error) {
                setHarFeil(true);
            } finally {
                setLasterData(false);
            }
        };

        hentCvData();
    }, [fnr]);

    if (lasterData) {
        return (
            <Panel border className="info_panel" tabIndex={2}>
                <Laster />
            </Panel>
        );
    }

    if (harFeil) {
        return (
            <Panel border className="info_panel" tabIndex={2}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    CV
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const erManuell = underOppfolging?.erManuell;

    if (cvOgJobbonsker) {
        const {
            fagdokumentasjoner,
            sammendrag,
            arbeidserfaring,
            annenErfaring,
            utdanning,
            godkjenninger,
            andreGodkjenninger,
            forerkort,
            sprak,
            kurs,
            sistEndret,
            jobbprofil
        } = cvOgJobbonsker;

        return (
            <Panel border className="info_panel" tabIndex={2}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    CV
                </Heading>
                <LastNedCV erManuell={erManuell} fnr={fnr} />
                <RedigerCV erManuell={erManuell} fnr={fnr} />
                <SistEndret sistEndret={sistEndret} onlyYearAndMonth={false} />
                <Sammendrag sammendrag={sammendrag} />
                <div className="info_container">
                    <Utdanning utdanning={utdanning} />
                    <Arbeidserfaring arbeidserfaring={arbeidserfaring} />
                    <Fagdokumentasjoner fagdokumentasjoner={fagdokumentasjoner} />
                    <Kompetanser kompetanse={jobbprofil?.kompetanse} />
                    <Sprak sprak={sprak} />
                    <Kurs kurs={kurs} />
                    <Forerkort forerkort={forerkort} />
                    <AnnenErfaring annenErfaring={annenErfaring} />
                    <Godkjenninger godkjenninger={godkjenninger} />
                    <AndreGodkjenninger andreGodkjenninger={andreGodkjenninger} />
                </div>
            </Panel>
        );
    }
    return (
        <Panel border className="info_panel" tabIndex={2}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
                CV
            </Heading>
            <Alert variant="info">Ingen CV registrert</Alert>
        </Panel>
    );
};

export default CvInnhold;
