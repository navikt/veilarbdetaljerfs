import { useAppStore } from '../stores/app-store';
import { LastNedCV } from './cv/last-ned-cv';
import { RedigerCV } from './cv/rediger-cv';
import { useAktorId, useCvOgJobbonsker, useUnderOppfolging } from '../data/api/fetch';
import { Alert, Link, List, HStack } from '@navikt/ds-react';
import { AlertMedFeilkode, Laster } from './felles/minikomponenter';
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
import { CvIkkeSynligInfo } from './cv/cv-ikke-synlig-info';
import './fellesStyling.css';
import { byggPamUrl } from '../utils';
import { trackAmplitude } from '../amplitude/amplitude';
import { getForsteKorrelasjonsIdEllerNull } from '../utils/feilmelding-utils.ts';

const Cvinnhold = () => {
    const { fnr } = useAppStore();

    const {
        data: cvOgJobbonskerData,
        error: cvOgJobbonskerError,
        isLoading: cvOgJobbonskerLoading
    } = useCvOgJobbonsker(fnr);
    const {
        data: underOppfolgingData,
        error: underOppfolgingError,
        isLoading: underOppfolgingLoading
    } = useUnderOppfolging(fnr);

    const aktorId = useAktorId(fnr);

    const erManuell = underOppfolgingData?.erManuell;
    const endreCvUrl = byggPamUrl(fnr);

    if (cvOgJobbonskerLoading || underOppfolgingLoading) {
        return <Laster />;
    }

    if (!underOppfolgingData?.underOppfolging) {
        return (
            <Alert variant="info" size="small">
                Bruker er ikke under arbeidsrettet oppfølging
            </Alert>
        );
    }

    if (cvOgJobbonskerError?.status === 401 || cvOgJobbonskerError?.status === 403) {
        return (
            <Alert variant="info" size="small">
                Du kan ikke se CV-en, be brukeren om å:
                <List as="ul" size="small">
                    <List.Item>Logge inn på arbeidsplassen.no</List.Item>
                    <List.Item>Lese teksten om at du må dele CV-en med Nav</List.Item>
                    <List.Item>Gå videre og gjennomføre det tjenesten ber om</List.Item>
                </List>
                Ved å gjøre dette får brukeren informasjon om behandlingsgrunnlaget, og du vil se CV-en.
            </Alert>
        );
    }

    if (cvOgJobbonskerError?.status === 204 || cvOgJobbonskerError?.status === 404) {
        return (
            <Alert inline variant="info" size="small">
                Ingen CV registrert.{' '}
                {erManuell && aktorId && (
                    <Link
                        href={endreCvUrl}
                        target="_blank"
                        rel="noopener"
                        onClick={() => {
                            trackAmplitude({
                                name: 'navigere',
                                data: { lenketekst: 'Registrer her', destinasjon: 'Registrer CV' }
                            });
                        }}
                    >
                        Registrer her
                    </Link>
                )}
            </Alert>
        );
    }

    if (cvOgJobbonskerError || underOppfolgingError) {
        const feilkodeEllerNull = getForsteKorrelasjonsIdEllerNull([cvOgJobbonskerError, underOppfolgingError]);

        return <AlertMedFeilkode feilkode={feilkodeEllerNull} />;
    }

    if (cvOgJobbonskerData && Object.keys(cvOgJobbonskerData).length) {
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
        } = cvOgJobbonskerData;

        return (
            <>
                <HStack gap="4" className="cv-lenker">
                    <LastNedCV erManuell={erManuell} fnr={fnr} />
                    <RedigerCV erManuell={erManuell} endreCvUrl={endreCvUrl} />
                </HStack>
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
                <CvIkkeSynligInfo />
            </>
        );
    }
    // TODO: Kan vi bruke korrelasjonsId/feilkode her, og i så fall kva for ein skal vi bruke? 2024-11-08, Sondre
    return <AlertMedFeilkode />;
};

export default Cvinnhold;
