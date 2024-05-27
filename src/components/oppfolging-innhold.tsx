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
import { useOppfolgingsstatus, usePersonalia, useVeileder } from '../data/api/fetch';
import { Alert } from '@navikt/ds-react';
import {hentBehandlingsnummer} from "../utils/konstanter.ts";

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

    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatusData?.hovedmaalkode;
    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;
    const innsatsGruppe: OrNothing<Innsatsgruppe | ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;

    if (oppfolgingsstatusLoading || personLoading || veilederLoading) {
        return <Laster />;
    }

    if (
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (oppfolgingsstatusError || personError || veilederError) {
        return <Errormelding />;
    }

    return (
        <>
            <span className="info_container">
                <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(personData)} />
                <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsstatusData)} />
                <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veilederData)} />
                <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
                <EnkeltInformasjon header="Innsatsgruppe" value={mapInnsatsgruppeTilTekst(innsatsGruppe)} />
            </span>
            <Alert variant="info" size="small" className="panel_infoboks">
                Hovedmål fra oppfølgingsvedtak fattet i Modia vises foreløpig ikke her. For å se dette, gå til fanen
                "Oppfølgingsvedtak".
            </Alert>
        </>
    );
};

export default Oppfolgingsinnhold;
