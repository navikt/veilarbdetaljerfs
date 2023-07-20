import { useAppStore } from '../stores/app-store';
import { JobbprofilOppstartstype } from '../data/api/datatyper/arenaperson';
import { RedigerCV } from './cv/rediger-cv';
import { Alert, Heading, Panel } from '@navikt/ds-react';
import { Errormelding, Laster } from './felles/minikomponenter';
import SistEndret from './felles/sist-endret';
import { formatStringInUpperAndLowerCaseUnderscore } from '../utils/formater';
import { DobbeltInformasjon } from './felles/dobbelinfo';
import { useCvOgJobbonsker, useUnderOppfolging } from '../data/api/fetch';

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

const Jobbonsker = () => {
    const { fnr } = useAppStore();

    const cvOgJobbonsker = useCvOgJobbonsker(fnr);
    const underOppfolging = useUnderOppfolging(fnr);

    if (cvOgJobbonsker.isLoading || underOppfolging.isLoading) {
        return (
            <Panel border className="info_panel" tabIndex={5}>
                <Laster />
            </Panel>
        );
    }

    if (cvOgJobbonsker?.error?.status === 204 || cvOgJobbonsker?.error?.status === 404) {
        return (
            <Panel border className="info_panel" tabIndex={2}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Jobbønsker
                </Heading>
                <Alert inline variant="info">
                    Ingen jobbønsker registrert
                </Alert>
            </Panel>
        );
    }

    if (cvOgJobbonsker.error || underOppfolging.error) {
        return (
            <Panel border className="info_panel" tabIndex={5}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Jobbønsker
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const erManuell = underOppfolging?.data?.erManuell;

    if (cvOgJobbonsker?.data?.jobbprofil) {
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
        } = cvOgJobbonsker.data.jobbprofil;

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
            <Panel border className="info_panel" tabIndex={5}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Jobbønsker
                </Heading>
                <RedigerCV erManuell={erManuell} fnr={fnr} />
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
            </Panel>
        );
    }
    return (
        <Panel border className="info_panel" tabIndex={5}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
                Jobbønsker
            </Heading>
            <Errormelding />
        </Panel>
    );
};

export default Jobbonsker;
