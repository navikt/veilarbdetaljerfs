import { Heading, Panel } from '@navikt/ds-react';
import { Laster, Errormelding } from './felles/minikomponenter';
import './nokkelinfo.css';
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

const Oppfolging = () => {
    const { fnr } = useAppStore();

    const oppfolgingsstatus = useOppfolgingsstatus(fnr);
    const person = usePersonalia(fnr);

    // CONDITIONAL FETCH PÅ EN BEDRE MÅTE? SJEKK CONDITIONAL FETCHING I SWR DOCS
    const veileder = useVeileder(oppfolgingsstatus.data?.veilederId ? oppfolgingsstatus.data.veilederId : null);

    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatus?.data?.hovedmaalkode;
    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatus?.data?.servicegruppe;
    const innsatsGruppe: OrNothing<Innsatsgruppe | ArenaServicegruppeKode> = oppfolgingsstatus?.data?.servicegruppe;

    if (oppfolgingsstatus.isLoading || person.isLoading || veileder.isLoading) {
        return (
            <Panel border className="info_panel" tabIndex={3}>
                <Laster />
            </Panel>
        );
    }

    if (oppfolgingsstatus.error || person.error || veileder.error) {
        return (
            <Panel border className="info_panel" tabIndex={3}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Oppfølging
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    return (
        <Panel border className="info_panel" tabIndex={3}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
                Oppfølging
            </Heading>
            <span className="info_container">
                <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
                <EnkeltInformasjon header="Innsatsgruppe" value={mapInnsatsgruppeTilTekst(innsatsGruppe)} />
                <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(person?.data)} />
                <EnkeltInformasjon
                    header="Oppfølgingsenhet"
                    value={hentOppfolgingsEnhetTekst(oppfolgingsstatus?.data)}
                />
                <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veileder?.data)} />
            </span>
        </Panel>
    );
};

export default Oppfolging;
