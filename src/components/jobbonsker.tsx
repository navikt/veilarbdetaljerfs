import { useEffect, useState } from 'react';
import { useAppStore } from '../stores/app-store';
import { ArenaPerson, JobbprofilOppstartstype } from '../data/api/datatyper/arenaperson';
import { UnderOppfolgingData } from '../data/api/datatyper/underOppfolgingData';
import { RedigerCV } from './cv/rediger-cv';
import { hentCvOgJobbonsker, hentUnderOppfolging } from '../data/api/fetch';
import { Heading, Panel } from '@navikt/ds-react';
import { Errormelding, Info, Laster, Warning } from './felles/minikomponenter';
import SistEndret from './felles/sist-endret';
import { formatStringInUpperAndLowerCaseUnderscore } from '../utils/formater';
import { DobbeltInformasjon } from './felles/dobbelinfo';

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
    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [cvOgJobbonsker, setCvOgJobbonsker] = useState<ArenaPerson | null>(null);
    const [underOppfolging, setUnderOppfolging] = useState<UnderOppfolgingData | null>(null);

    useEffect(() => {
        const hentJobbonskerData = async () => {
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

        hentJobbonskerData();
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
                    Jobbønsker
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const erManuell = underOppfolging?.erManuell;

    if (cvOgJobbonsker?.jobbprofil) {
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
        } = cvOgJobbonsker.jobbprofil;

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
            <Panel border className="info_panel">
                <Heading spacing level="2" size="large">
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
        <Panel border className="info_panel">
            <Heading spacing level="2" size="large">
                Jobbønsker
            </Heading>
            <Info melding="Ingen jobbønsker registrert" />
        </Panel>
    );
};

export default Jobbonsker;
