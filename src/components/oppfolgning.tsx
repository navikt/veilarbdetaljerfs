import { Heading, Panel } from '@navikt/ds-react';
import { Laster, Errormelding } from './felles/minikomkomponenter';
import './nokkelinfo.css';
import { VeilederData } from '../data/api/datatyper/veileder';
import { useAppStore } from '../stores/app-store';
import {
    hentOppfolgingsstatus,
    hentPersonalia,
    hentRegistrering,
    hentTolk,
    hentVeileder,
    hentYtelser
} from '../data/api/fetch';
import {
    OppfolgingsstatusData,
    ArenaHovedmalKode,
    ArenaServicegruppeKode
} from '../data/api/datatyper/oppfolgingsstatus';
import { useEffect, useState } from 'react';
import { PersonaliaV2Info, PersonsBarn } from '../data/api/datatyper/personalia';
import { RegistreringsData } from '../data/api/datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { YtelseData } from '../data/api/datatyper/ytelse';
import { OrNothing, StringOrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import {
    getVedtakForVisning,
    hentGeografiskEnhetTekst,
    hentOppfolgingsEnhetTekst,
    hentTolkTekst,
    hentVeilederTekst,
    mapHovedmalTilTekst,
    mapInnsatsgruppeTilTekst,
    mapServicegruppeTilTekst
} from '../utils/text-mapper';
import { Hovedmal, Innsatsgruppe } from '../data/api/datatyper/siste14aVedtak';
import EMDASH from '../utils/emdash';
import { formaterDato, kalkulerAlder } from '../utils/formater';
import { PilotAlert } from './pilotAlert';

const Oppfolgning = () => {
    const { fnr } = useAppStore();

    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [veileder, setVeileder] = useState<VeilederData | null>(null);
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingsstatusData | null>(null);
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

    useEffect(() => {
        const hentOppfolgningsData = async () => {
            try {
                setLasterData(true);
                const [_oppfolgingsstatus, _personalia] = await Promise.all([
                    hentOppfolgingsstatus(fnr),
                    hentPersonalia(fnr)
                ]);

                if (_oppfolgingsstatus !== null && _oppfolgingsstatus?.veilederId !== null) {
                    const _veileder = await hentVeileder(_oppfolgingsstatus.veilederId);
                    setVeileder(_veileder);
                }

                setOppfolgingsstatus(_oppfolgingsstatus);
                setPerson(_personalia);
            } catch (err) {
                setHarFeil(true);
            } finally {
                setLasterData(false);
            }
        };

        hentOppfolgningsData();
    }, [fnr]);

    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatus?.hovedmaalkode;
    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatus?.servicegruppe;
    const innsatsGruppe: OrNothing<Innsatsgruppe | ArenaServicegruppeKode> = oppfolgingsstatus?.servicegruppe;

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
                <Errormelding />
            </Panel>
        );
    }

    return (
        <>
            <Panel border className="info_panel">
                <Heading spacing level="2" size="large">
                    Oppfølgning
                </Heading>
                <span className="info_container">
                    <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
                    <EnkeltInformasjon header="Innsatsgruppe" value={mapInnsatsgruppeTilTekst(innsatsGruppe)} />
                    <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veileder)} />
                    <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(person)} />
                    <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsstatus)} />
                    <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                </span>
            </Panel>
            <PilotAlert />
        </>
    );
};

export default Oppfolgning;