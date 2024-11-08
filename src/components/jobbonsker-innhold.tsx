import { useAppStore } from '../stores/app-store';
import { JobbprofilOppstartstype } from '../data/api/datatyper/arenaperson';
import { RedigerCV } from './cv/rediger-cv';
import { Alert, Link, List } from '@navikt/ds-react';
import { AlertMedFeilkode, Laster } from './felles/minikomponenter';
import SistEndret from './felles/sist-endret';
import { formatStringInUpperAndLowerCaseUnderscore } from '../utils/formater';
import { DobbeltInformasjon } from './felles/dobbelinfo';
import { useAktorId, useCvOgJobbonsker, useUnderOppfolging } from '../data/api/fetch';
import { byggPamUrl } from '../utils';
import { trackAmplitude } from '../amplitude/amplitude';
import { getForsteKorrelasjonsIdEllerNull } from '../utils/feilmelding-utils.ts';

const asciiTilNorsk = (tekst: string) => {
    switch (tekst) {
        case 'UKEDAGER':
            return 'Ukedager';
        case 'LOERDAG':
            return 'Lørdag';
        case 'SOENDAG':
            return 'Søndag';
        case 'LAERLING':
            return 'Lærling';
        case 'SELVSTENDIG_NAERINGSDRIVENDE':
            return 'Selvstendig næringsdrivende';
        default:
            return tekst;
    }
};

const oppstartstypeTilTekst = (oppstartstype: JobbprofilOppstartstype): string => {
    switch (oppstartstype) {
        case JobbprofilOppstartstype.ETTER_AVTALE:
            return 'Etter avtale';
        case JobbprofilOppstartstype.ETTER_TRE_MND:
            return 'Etter tre måneders oppsigelsestid';
        case JobbprofilOppstartstype.LEDIG_NAA:
            return 'Kan begynne nå';
        default:
            return '';
    }
};

const Jobbonskerinnhold = () => {
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
                Du har ikke tilgang til å se jobbønsker for denne brukeren. Årsaker kan være
                <List as="ul" size="small">
                    <List.Item>
                        Bruker må informeres om Navs behandlingsgrunnlag før veileder får tilgang. Be bruker gå inn på
                        nav.no og oppdatere CV-en sin.
                    </List.Item>
                </List>
            </Alert>
        );
    }

    if (cvOgJobbonskerError?.status === 204 || cvOgJobbonskerError?.status === 404 || !cvOgJobbonskerData?.jobbprofil) {
        return (
            <Alert inline variant="info" size="small">
                Ingen jobbønsker registrert.{' '}
                {erManuell && aktorId && (
                    <Link
                        href={endreCvUrl}
                        target="_blank"
                        rel="noopener"
                        onClick={() => {
                            trackAmplitude({
                                name: 'navigere',
                                data: { lenketekst: 'Registrer her', destinasjon: 'Registrere jobbønsker' }
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

    if (cvOgJobbonskerData?.jobbprofil) {
        const {
            sistEndret,
            onsketYrke,
            onsketArbeidssted,
            onsketAnsettelsesform,
            onsketArbeidstidsordning,
            onsketArbeidsskiftordning,
            onsketArbeidsdagordning,
            heltidDeltid,
            oppstart
        } = cvOgJobbonskerData.jobbprofil;

        const arbeidssted = onsketArbeidssted.map((sted) => sted.stedsnavn);
        const yrker = onsketYrke.map((yrke) => yrke.tittel);
        const heltidDeltidList = [heltidDeltid.heltid ? 'Heltid' : null, heltidDeltid.deltid ? 'Deltid' : null];
        const ansettelsesform = onsketAnsettelsesform.map((form) =>
            formatStringInUpperAndLowerCaseUnderscore(asciiTilNorsk(form.tittel))
        );
        const arbeidstid = onsketArbeidstidsordning.map((tid) => formatStringInUpperAndLowerCaseUnderscore(tid.tittel));
        const arbeidsdag = onsketArbeidsdagordning.map((dag) => asciiTilNorsk(dag.tittel));
        const arbeidsskift = onsketArbeidsskiftordning.map((skift) =>
            formatStringInUpperAndLowerCaseUnderscore(skift.tittel)
        );
        const oppstartstid = [oppstartstypeTilTekst(oppstart)];

        return (
            <>
                <RedigerCV erManuell={erManuell} endreCvUrl={endreCvUrl} />
                <SistEndret sistEndret={sistEndret} onlyYearAndMonth={false} />
                <div className="info_container">
                    <DobbeltInformasjon header="Jobber og yrker" values={yrker} />
                    <DobbeltInformasjon header="Områder" values={arbeidssted} />
                    <DobbeltInformasjon header="Heltid eller deltid" values={heltidDeltidList} />
                    <DobbeltInformasjon
                        header="Arbeidstider"
                        values={[...arbeidstid, ...arbeidsdag, ...arbeidsskift]}
                    />
                    <DobbeltInformasjon header="Ansettelsesform" values={ansettelsesform} />
                    <DobbeltInformasjon header="Oppstart" values={oppstartstid} />
                </div>
            </>
        );
    }
    // TODO: Kan vi bruke korrelasjonsId/feilkode her, og i så fall kva for ein skal vi bruke? 2024-11-08, Sondre
    return <AlertMedFeilkode />;
};

export default Jobbonskerinnhold;
