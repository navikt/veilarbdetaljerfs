import { useEffect, useState } from 'react';
import { useAppStore } from '../../stores/app-store';
import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
// import { UnderOppfolgingData } from '../../data/api/datatyper/underOppfolgingData';
// import { AktorId } from '../../data/api/datatyper/aktor-id';
import { hentAktorId, hentCvOgJobbonsker, hentUnderOppfolging } from '../../data/api/fetch';
import { Heading, Panel } from '@navikt/ds-react';
import { Errormelding, Laster } from '../felles/minikomkomponenter';
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
    // const [underOppfolging, setUnderOppfolging] = useState<UnderOppfolgingData | null>(null);
    // const [aktorId, setAktorId] = useState<AktorId | null>(null);

    useEffect(() => {
        const hentCvData = async () => {
            try {
                setLasterData(true);
                const [_cvOgJobbonsker, _underOppfolging, _aktorId] = await Promise.all([
                    hentCvOgJobbonsker(fnr),
                    hentUnderOppfolging(fnr),
                    hentAktorId(fnr)
                ]);

                setCvOgJobbonsker(_cvOgJobbonsker);
                // setUnderOppfolging(_underOppfolging);
                // setAktorId(_aktorId);
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

    // Sjekk for om veileder har tilgang til CV til bruker i.e. HTTP status kode 401 eller 403

    // Sjekk om bruker har registrert en CV i.e. HTTP status kode 204 eller 404

    // Fikse lenke for å laste ned cv/endre cv, samt komponent for å displaye

    // Fikse komponent for å vise "sist endret" for CV

    // Fiks CSS styling!

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
            // sistEndret,
            jobbprofil
        } = cvOgJobbonsker;

        return (
            <Panel border className="cv-panel">
                <Heading spacing level="2" size="large">
                    CV
                </Heading>
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
        <Panel>
            <Errormelding />
        </Panel>
    );
};

export default CvInnhold;
