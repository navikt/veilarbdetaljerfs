import { useAppStore } from '../stores/app-store';
import { LastNedCV } from './cv/last-ned-cv';
import { RedigerCV } from './cv/rediger-cv';
import { useCvOgJobbonsker, useUnderOppfolging } from '../data/api/fetchv2';
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

    const cvOgJobbonsker = useCvOgJobbonsker(fnr);
    console.log('TEST CV:', cvOgJobbonsker.data, cvOgJobbonsker.isLoading, cvOgJobbonsker.error);
    console.log('ERROR CV:', cvOgJobbonsker.error?.info);

    const underOppfolging = useUnderOppfolging(fnr);
    console.log('TEST OPPFØLGNING:', underOppfolging.data, underOppfolging.isLoading, underOppfolging.error);
    console.log('ERROR OPPFØLGING:', underOppfolging.error?.info);

    if (cvOgJobbonsker.isLoading || underOppfolging.isLoading) {
        return (
            <Panel border className="info_panel" tabIndex={2}>
                <Laster />
            </Panel>
        );
    }

    if (cvOgJobbonsker.error || underOppfolging.error) {
        return (
            <Panel border className="info_panel" tabIndex={2}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    CV
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const erManuell = underOppfolging.data?.erManuell;

    if (cvOgJobbonsker.data) {
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
        } = cvOgJobbonsker.data;

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
            <Alert inline variant="info">
                Ingen CV registrert
            </Alert>
        </Panel>
    );
};

export default CvInnhold;
