import { BodyLong, Heading, Panel } from '@navikt/ds-react';
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
    mapServicegruppeTilTekst
} from '../utils/text-mapper';
import { Hovedmal } from '../data/api/datatyper/siste14aVedtak';
import EMDASH from '../utils/emdash';
import { formaterDato, kalkulerAlder } from '../utils/formater';
import { PilotAlert } from './pilotAlert';

const Nokkelinfo = () => {
    const { fnr } = useAppStore();

    const [lasterData, setLasterData] = useState<boolean>(false);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [veileder, setVeileder] = useState<VeilederData | null>(null);
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingsstatusData | null>(null);
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);
    const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);
    const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);
    const [ytelser, setYtelser] = useState<YtelseData | null>(null);

    useEffect(() => {
        const hentOverblikkData = async () => {
            try {
                setLasterData(true);
                const [_oppfolgingsstatus, _personalia, _registrering, _tolk, _ytelser] = await Promise.all([
                    hentOppfolgingsstatus(fnr),
                    hentPersonalia(fnr),
                    hentRegistrering(fnr),
                    hentTolk(fnr),
                    hentYtelser(fnr)
                ]);

                if (_oppfolgingsstatus?.veilederId !== null) {
                    const _veileder = await hentVeileder(_oppfolgingsstatus.veilederId);
                    setVeileder(_veileder);
                }

                setOppfolgingsstatus(_oppfolgingsstatus);
                setPerson(_personalia);
                setRegistrering(_registrering);
                setTolk(_tolk);
                setYtelser(_ytelser);
            } catch (err) {
                setHarFeil(true);
            } finally {
                setLasterData(false);
            }
        };

        hentOverblikkData();
    }, [fnr]);

    const telefon: StringOrNothing = person?.telefon?.find((entry) => entry.prioritet === '1')?.telefonNr;
    const taletolk: OrNothing<TilrettelagtKommunikasjonData> = tolk;
    const sivilstatus: StringOrNothing = person?.sivilstandliste?.[0]?.sivilstand;
    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatus?.hovedmaalkode;
    const registrertAv: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const aktivVedtak: StringOrNothing = getVedtakForVisning(ytelser?.vedtaksliste);
    const datoRegistrert: StringOrNothing = registrering?.registrering?.opprettetDato;
    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatus?.servicegruppe;
    const MAX_ALDER_BARN = 21;
    const barn: PersonsBarn[] =
        (person?.barn &&
            person.barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN)) ||
        [];


    if (lasterData) {
        return (
            <Panel border className="nokkelinfoPanel">
                <Laster />
            </Panel>
        );
    }

    if (harFeil) {
        return (
            <Panel border className="nokkelinfoPanel">
                <Errormelding />
            </Panel>
        );
    }

    return (
        <>
            <Panel border className="nokkelinfoPanel">
                <Heading spacing level="2" size="large">
                    Nøkkelinfo
                </Heading>
                <BodyLong className="nokkelinfoContainer">
                    <EnkeltInformasjon header="Telefon" value={telefon ? telefon : EMDASH} />
                    <EnkeltInformasjon header="Antall barn under 21 år" value={barn.length.toString() || '0'} />
                    <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veileder)} />
                    <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsstatus)} />
                    <EnkeltInformasjon header="Registrert av" value={registrertAv ? registrertAv : EMDASH} />
                    <EnkeltInformasjon header="Tilrettelagt kommunikasjon" value={hentTolkTekst(taletolk)} />
                    <EnkeltInformasjon header="Sivilstand" value={sivilstatus ? sivilstatus : EMDASH} />
                    <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                    <EnkeltInformasjon header="Aktive ytelse(r)" value={aktivVedtak ? aktivVedtak : EMDASH} />
                    <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(person)} />
                    <EnkeltInformasjon header="Registrert dato" value={formaterDato(datoRegistrert)} />
                    <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
                </BodyLong>
            </Panel>
            <PilotAlert />
        </>
    );
};

export default Nokkelinfo;
