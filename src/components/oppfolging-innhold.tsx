import { Laster, Errormelding } from './felles/minikomponenter';
import { useAppStore } from '../stores/app-store';
import { ArenaHovedmalKode, ArenaServicegruppeKode } from '../data/api/datatyper/oppfolgingsstatus';
import { OrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import {
    hentBeskrivelseTilHovedmal,
    hentBeskrivelseTilInnsatsgruppe,
    hentGeografiskEnhetTekst,
    hentOppfolgingsEnhetTekst,
    hentVeilederTekst,
    mapHovedmalTilTekst,
    mapInnsatsgruppeTilTekst,
    mapServicegruppeTilTekst
} from '../utils/text-mapper';
import { Hovedmal, Innsatsgruppe } from '../data/api/datatyper/siste14aVedtak';
import {
    useOppfolgingsstatus,
    usePersonalia,
    useVeileder,
    useSiste14aVedtak,
    useKodeverk14a,
    OboFeatureToggles,
    useFeature,
    VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE
} from '../data/api/fetch';
import { Alert } from '@navikt/ds-react';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';
import { DobbeltInformasjon } from './felles/dobbelinfo.tsx';
import { formaterDato } from '../utils/formater.ts';

const Oppfolgingsinnhold = () => {
    const { fnr } = useAppStore();
    const behandlingsnummer = hentBehandlingsnummer();
    const {
        data: oppfolgingsstatusData,
        error: oppfolgingsstatusError,
        isLoading: oppfolgingsstatusLoading
    } = useOppfolgingsstatus(fnr);
    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr!, behandlingsnummer);
    const {
        data: veilederData,
        error: veilederError,
        isLoading: veilederLoading
    } = useVeileder(oppfolgingsstatusData?.veilederId);
    const { data: kodeverk14a, isLoading: kodeverk14aLoading, error: kodeverk14aError } = useKodeverk14a();
    const {
        data: siste14avedtak,
        error: siste14avedtakError,
        isLoading: siste14avedtakLoading
    } = useSiste14aVedtak(fnr);
    const visInnsatsgruppeHovedmalToggle: OboFeatureToggles | undefined = useFeature().data;

    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatusData?.hovedmaalkode;
    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;
    const innsatsGruppe: OrNothing<Innsatsgruppe | ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;

    if (oppfolgingsstatusLoading || personLoading || veilederLoading || kodeverk14aLoading || siste14avedtakLoading) {
        return <Laster />;
    }

    if (
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404 ||
        kodeverk14aError?.status === 404 ||
        siste14avedtakError?.status === 204 ||
        siste14avedtakError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (oppfolgingsstatusError || personError || veilederError || kodeverk14aError || siste14avedtakError) {
        return <Errormelding />;
    }

    return (
        <>
            <span className="info_container">
                <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(personData)} />
                <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsstatusData)} />
                {visInnsatsgruppeHovedmalToggle &&
                visInnsatsgruppeHovedmalToggle[VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE] ? (
                    <DobbeltInformasjon
                        header="Innsatsgruppe (gjeldende § 14a-vedtak)"
                        values={[
                            hentBeskrivelseTilInnsatsgruppe(siste14avedtak?.innsatsgruppe, kodeverk14a),
                            `Vedtaksdato: ${formaterDato(siste14avedtak?.fattetDato)}`
                        ]}
                    />
                ) : (
                    <EnkeltInformasjon header="Innsatsgruppe" value={mapInnsatsgruppeTilTekst(innsatsGruppe)} />
                )}
                {visInnsatsgruppeHovedmalToggle &&
                visInnsatsgruppeHovedmalToggle[VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE] ? (
                    <DobbeltInformasjon
                        header="Hovedmål (gjeldende § 14a-vedtak)"
                        values={[
                            hentBeskrivelseTilHovedmal(siste14avedtak?.hovedmal, kodeverk14a),
                            `Vedtaksdato: ${formaterDato(siste14avedtak?.fattetDato)}`
                        ]}
                    />
                ) : (
                    <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                )}

                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veilederData)} />
                <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
            </span>
            {visInnsatsgruppeHovedmalToggle && !visInnsatsgruppeHovedmalToggle[VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE] &&
                <Alert variant="info" size="small" className="panel_infoboks">
                    Hovedmål fra oppfølgingsvedtak fattet i Modia vises foreløpig ikke her. For å se dette, gå til
                    fanen "Oppfølgingsvedtak".
                </Alert>
            }
        </>
    );
};

export default Oppfolgingsinnhold;
