import { Laster, Errormelding } from './felles/minikomponenter';
import { useAppStore } from '../stores/app-store';
import { ArenaHovedmalKode, ArenaServicegruppeKode } from '../data/api/datatyper/oppfolgingsstatus';
import { OrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import {
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
    OboFeatureToggles,
    useFeature,
    VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE
} from '../data/api/fetch';
import { Alert } from '@navikt/ds-react';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';
import { InnsatsGruppe } from './innsatsgruppe.tsx';
import { Hovedmaal } from './hovedmal.tsx';

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

    const {
        data: siste14avedtak,
        error: siste14avedtakError,
        isLoading: siste14avedtakLoading
    } = useSiste14aVedtak(fnr);
    const visInnsatsgruppeHovedmalToggle: OboFeatureToggles | undefined = useFeature().data;

    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatusData?.hovedmaalkode;
    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;
    const innsatsGruppe: OrNothing<Innsatsgruppe | ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;

    if (oppfolgingsstatusLoading || personLoading || veilederLoading || siste14avedtakLoading) {
        return <Laster />;
    }

    if (
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404 ||
        siste14avedtakError?.status === 204 ||
        siste14avedtakError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (oppfolgingsstatusError || personError || veilederError || siste14avedtakError) {
        return <Errormelding />;
    }

    return (
        <>
            <span className="info_container">
                <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(personData)} />
                <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsstatusData)} />
                {visInnsatsgruppeHovedmalToggle?.[VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE] ? (
                    <InnsatsGruppe
                        innsatsgruppe={siste14avedtak?.innsatsgruppe}
                        fattetDato={siste14avedtak?.fattetDato}
                    />
                ) : (
                    <EnkeltInformasjon header="Innsatsgruppe" value={mapInnsatsgruppeTilTekst(innsatsGruppe)} />
                )}
                {visInnsatsgruppeHovedmalToggle?.[VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE] ? (
                    <Hovedmaal hovedmal={siste14avedtak?.hovedmal} fattetDato={siste14avedtak?.fattetDato} />
                ) : (
                    <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                )}
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veilederData)} />
                <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
            </span>
            {!visInnsatsgruppeHovedmalToggle?.[VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE] && (
                <Alert variant="info" size="small" className="panel_infoboks">
                    Hovedmål fra oppfølgingsvedtak fattet i Modia vises foreløpig ikke her. For å se dette, gå til fanen
                    "Oppfølgingsvedtak".
                </Alert>
            )}
        </>
    );
};

export default Oppfolgingsinnhold;
