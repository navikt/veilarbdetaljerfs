import { useEffect, useState } from 'react';
import { useAppStore } from '../../stores/app-store';
import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import { UnderOppfolgingData } from '../../data/api/datatyper/underOppfolgingData';
import { LastNedCV } from './last-ned-cv';
import { RedigerCV } from './rediger-cv';
import { hentCvOgJobbonsker, hentUnderOppfolging } from '../../data/api/fetch';
import { Alert, Heading, Panel } from '@navikt/ds-react';
import { Errormelding, Laster } from '../felles/minikomponenter';
import SistEndret from '../felles/sist-endret';
import Sammendrag from './sammendrag';
import Arbeidserfaring from './arbeidserfaring';
import Utdanning from './utdanning';
import AnnenErfaring from './annen-erfaring';
import Godkjenninger from './godkjenninger';
import AndreGodkjenninger from './andre-godkjenninger';
import Kurs from './kurs';
import Forerkort from './forerkort';
import Sprak from './sprak';
import Kompetanser from './kompetanser';
import Fagdokumentasjoner from './fagdokumentasjoner';

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
            <Panel border className="info_panel">
                <Laster />
            </Panel>
        );
    }

    if (harFeil) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="large">
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
            <Panel border className="info_panel">
                <Heading spacing level="2" size="large">
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
                    <AnnenErfaring annenErfaring={annenErfaring} />
                    <Kompetanser kompetanse={jobbprofil?.kompetanse} />
                    <Godkjenninger godkjenninger={godkjenninger} />
                    <AndreGodkjenninger andreGodkjenninger={andreGodkjenninger} />
                    <Sprak sprak={sprak} />
                    <Forerkort forerkort={forerkort} />
                    <Kurs kurs={kurs} />
                </div>
            </Panel>
        );
    }
    return (
        <Panel border className="info_panel">
            <Heading spacing level="2" size="large">
                CV
            </Heading>
            <Alert variant="info">Ingen CV registrert</Alert>
        </Panel>
    );
};

export default CvInnhold;
