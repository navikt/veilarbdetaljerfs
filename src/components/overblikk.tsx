import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import './overblikk.css';
import { VeilederData } from '../data/api/datatyper/veileder';
import { useAppStore } from '../stores/app-store';
import {
    hentOppfolgingsstatus,
    hentPersonalia,
    hentRegistrering,
    hentTolk,
    hentVeileder,
    hentYtelser
    // ReturnData
} from '../data/api/fetch';
import { OppfolgingsstatusData, OppfolgingEnhet } from '../data/api/datatyper/oppfolgingsstatus';
import { useEffect, useState } from 'react';
import { Enhet, PersonaliaV2Info } from '../data/api/datatyper/personalia';
import { RegistreringsData } from '../data/api/datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { YtelseData } from '../data/api/datatyper/ytelse';
import { OrNothing, StringOrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';

const Overblikk = () => {
    const { fnr } = useAppStore();
    const [veileder, setVeileder] = useState<VeilederData>();
    // const [oppfolgingsstatus, setOppfolgingsstatus] = useState<ReturnData<OppfolgingsstatusData>>();
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingsstatusData>();
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);
    const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);
    const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);
    const [ytelser, setYtelser] = useState<YtelseData | null>(null);

    useEffect(() => {
        if (fnr != null) {
            hentOppfolgingsstatus(fnr).then((data) => {
                setOppfolgingsstatus(data);
            });
            hentPersonalia(fnr).then((data) => {
                setPerson(data);
            });
            hentRegistrering(fnr).then((data) => {
                setRegistrering(data);
            });
            hentTolk(fnr).then((data) => {
                setTolk(data);
            });
            hentYtelser(fnr).then((data) => {
                setYtelser(data);
            });
        }
    }, [fnr]);

    useEffect(() => {
        if (oppfolgingsstatus?.veilederId != null) {
            hentVeileder(oppfolgingsstatus?.veilederId).then((data) => {
                setVeileder(data);
            });
        }
    }, [oppfolgingsstatus?.veilederId]);

    // Set loader her.

    // Midlertidig data i overblikk, må endres etterhvert som vi får bedre innsikt i hva som trengs i oversikten
    const veilederNavn: StringOrNothing = veileder?.navn;
    const telefon: StringOrNothing = person?.telefon?.[0]?.telefonNr; // Henter kun ut 1 tlfnr, flere kan være registrert
    const antallBarn: StringOrNothing = person?.barn?.length.toString();
    const oppfolgingsenhet: OppfolgingEnhet | undefined = oppfolgingsstatus?.oppfolgingsenhet;
    const talespraak: StringOrNothing = tolk?.talespraak;
    const sivilstatus: StringOrNothing = person?.sivilstandliste?.[0]?.sivilstand;
    const brukersMaal: StringOrNothing = oppfolgingsstatus?.hovedmaalkode;
    const ytelserAktivitetsFase: StringOrNothing = ytelser?.vedtaksliste?.[0]?.aktivitetsfase; // Henter kun ut 1 ytelse, flere kan være registrert
    const geografiskEnhet: OrNothing<Enhet> = person?.geografiskEnhet;
    const registrertAv: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const datoRegistrert: StringOrNothing = registrering?.registrering?.opprettetDato;
    const spraak: StringOrNothing = person?.malform;

    const oppfolgingsenhetIDNAVN: StringOrNothing = oppfolgingsenhet?.enhetId + ' ' + oppfolgingsenhet?.navn;
    const geografiskenhetIDNAVN: StringOrNothing = geografiskEnhet?.enhetsnummer + ' ' + geografiskEnhet?.navn;

    return (
        <Panel border className="overblikkPanel">
            <Heading spacing level="2" size="large">
                Overblikk
            </Heading>
            <BodyLong className="overblikkContainer">
                <EnkeltInformasjon header="Veileder" value={veilederNavn} />
                <EnkeltInformasjon header="Telefon" value={telefon} />
                <EnkeltInformasjon header="Antall barn" value={antallBarn} />
                <EnkeltInformasjon header="Oppfølgingsenhet" value={oppfolgingsenhetIDNAVN} />
                <EnkeltInformasjon header="Talespråk" value={talespraak} />
                <EnkeltInformasjon header="Sivilstatus" value={sivilstatus} />
                <EnkeltInformasjon header="Brukers mål" value={brukersMaal} />
                <EnkeltInformasjon header="Ytelse(r)" value={ytelserAktivitetsFase} />
                <EnkeltInformasjon header="Geografisk enhet" value={geografiskenhetIDNAVN} />
                <EnkeltInformasjon header="Registrert av" value={registrertAv} />
                <EnkeltInformasjon header="Dato registrert" value={datoRegistrert} />
                <EnkeltInformasjon header="Språk" value={spraak} />
            </BodyLong>
        </Panel>
    );
};

export default Overblikk;
