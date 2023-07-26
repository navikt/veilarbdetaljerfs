import { Alert, Heading, Panel } from '@navikt/ds-react';
import { Laster, Errormelding } from './felles/minikomponenter';
import './nokkelinfo.css';
import { useAppStore } from '../stores/app-store';
import { ArenaHovedmalKode, ArenaServicegruppeKode } from '../data/api/datatyper/oppfolgingsstatus';
import { OrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import {
    erInnsatsgruppe,
    hentGeografiskEnhetTekst,
    hentOppfolgingsEnhetTekst,
    hentVeilederTekst,
    mapHovedmalTilTekst,
    mapInnsatsgruppeTilTekst,
    mapServicegruppeTilTekst
} from '../utils/text-mapper';
import { Hovedmal, Innsatsgruppe, Siste14aVedtak } from '../data/api/datatyper/siste14aVedtak';
import {
    useOppfolgingsstatus,
    usePersonalia,
    useSiste14aVedtak,
    useTilhorerBrukerUtrulletKontor,
    useVeileder
} from '../data/api/fetch';
import Show from './felles/show';
import { INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE } from '../data/api/datatyper/feature';
import { VeilederData } from '../data/api/datatyper/veileder';

const Oppfolging = () => {
    const { fnr, features } = useAppStore();

    const {
        data: oppfolgingsstatusData,
        error: oppfolgingsstatusError,
        isLoading: oppfolgingsstatusLoading
    } = useOppfolgingsstatus(fnr);
    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr);
    const {
        data: veilederData,
        error: veilederError,
        isLoading: veilederLoading
    } = useVeileder(oppfolgingsstatusData?.veilederId);
    const {
        data: utrulletData,
        error: utrulletError,
        isLoading: utrulletLoading
    } = useTilhorerBrukerUtrulletKontor(fnr);
    const {
        data: siste14aVedtakData,
        error: siste14aVedtakError,
        isLoading: siste14aVedtakLoading
    } = useSiste14aVedtak(fnr);

    let hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatusData?.hovedmaalkode;
    let serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;
    let innsatsGruppe: OrNothing<Innsatsgruppe | ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;
    const siste14aVedtak: OrNothing<Siste14aVedtak> = siste14aVedtakData;
    const utrullet: VeilederData | undefined | boolean = utrulletData;

    if (hentInnsatsgruppeOgHovedmalFraVedtaksstotte() && erInnsatsgruppe(serviceGruppe)) {
        // Vi bruker servicegruppe fra Arena som master for om vi skal vise servicegruppe eller innsatsgruppe + hovedmål
        // fra vedtaksstøtte dersom det er togglet på. Hvis servicegruppe fra Arena er en innsatsgruppe, så viser vi
        // innsatsgruppe + hovedmål fra vedtaksstøtte. Hvis servicegruppe fra Arena ikke er en innsatsgruppe, så viser
        // vi ikke innsatsgruppe og hovedmål fra vedtaksstøtte, siden bruker da har fått en nyere status i Arena.
        innsatsGruppe = siste14aVedtak?.innsatsgruppe;
        hovedmaal = siste14aVedtak?.hovedmal;
    }

    function hentInnsatsgruppeOgHovedmalFraVedtaksstotte() {
        return features[INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE];
    }

    if (oppfolgingsstatusLoading || personLoading || veilederLoading || utrulletLoading || siste14aVedtakLoading) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="medium" className="panel_header">
                    Oppfølging
                </Heading>
                <Laster />
            </Panel>
        );
    }

    if (
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404 ||
        utrulletError?.status === 204 ||
        utrulletError?.status === 404 ||
        siste14aVedtakError?.status === 204 ||
        siste14aVedtakError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (oppfolgingsstatusError || personError || veilederError) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="medium" className="panel_header">
                    Oppfølging
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    return (
        <Panel border className="info_panel">
            <Heading spacing level="2" size="medium" className="panel_header">
                Oppfølging
            </Heading>
            <span className="info_container">
                <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(personData)} />
                <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsstatusData)} />
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veilederData)} />
                {serviceGruppe ? (
                    <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
                ) : (
                    <EnkeltInformasjon header="Innsatsgruppe" value={mapInnsatsgruppeTilTekst(innsatsGruppe)} />
                )}
                <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
            </span>
            <Show if={utrullet ? utrullet && !hentInnsatsgruppeOgHovedmalFraVedtaksstotte() : false}>
                <Alert variant="info" className="alert-hovedmal-vedtaksstotte alertstripe_intern">
                    Hovedmål fra oppfølgingsvedtak fattet i Modia vises foreløpig ikke her. For å se dette, gå til fanen
                    "Oppfølgingsvedtak".
                </Alert>
            </Show>
        </Panel>
    );
};

export default Oppfolging;
