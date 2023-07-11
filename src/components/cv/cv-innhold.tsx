import { useEffect, useState } from 'react';
import { useAppStore } from '../../stores/app-store';
import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import { UnderOppfolgingData } from '../../data/api/datatyper/underOppfolgingData';
import { LastNedCV } from './last-ned-cv';
import { RedigerCV } from './rediger-cv';
import { byggPamUrl } from '../../utils';
import { hentCvOgJobbonsker, hentUnderOppfolging } from '../../data/api/fetch';
import { Heading, Panel } from '@navikt/ds-react';
import { Errormelding, Laster, IngenCv } from '../felles/minikomkomponenter';
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
import './cv-innhold.css';

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
            <Panel border className="cv-panel">
                <Laster />
            </Panel>
        );
    }

    if (harFeil) {
        return (
            <Panel border className="cv-panel">
                <Heading spacing level="2" size="large">
                    CV
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const erManuell = underOppfolging?.erManuell;

    const endreCvUrl = byggPamUrl(fnr);
    const lastNedCvUrl = byggPamUrl(fnr, '/cv/pdf');

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
            <Panel border className="cv-panel">
                <Heading spacing level="2" size="large">
                    CV
                </Heading>
                <LastNedCV erManuell={erManuell} lastNedCvLenke={lastNedCvUrl} />
                <RedigerCV erManuell={erManuell} cvRegistreringsLenke={endreCvUrl} />
                <SistEndret sistEndret={sistEndret} onlyYearAndMonth={false} />
                <Sammendrag sammendrag={sammendrag} />
                <div className="cv-container">
                    <Arbeidserfaring arbeidserfaring={arbeidserfaring} />
                    <Utdanning utdanning={utdanning} />
                    <AnnenErfaring annenErfaring={annenErfaring} />
                    <Godkjenninger godkjenninger={godkjenninger} />
                    <AndreGodkjenninger andreGodkjenninger={andreGodkjenninger} />
                    <Kurs kurs={kurs} />
                    <Forerkort forerkort={forerkort} />
                    <Sprak sprak={sprak} />
                    <Kompetanser kompetanse={jobbprofil?.kompetanse} />
                    <Fagdokumentasjoner fagdokumentasjoner={fagdokumentasjoner} />
                </div>
            </Panel>
        );
    }
    return (
        <Panel border className="cv-panel">
            <Heading spacing level="2" size="large">
                CV
            </Heading>
            <IngenCv />
        </Panel>
    );
};

export default CvInnhold;
