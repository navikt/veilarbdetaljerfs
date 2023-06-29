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
} from '../data/api/fetch';
import { OppfolgingsstatusData, OppfolgingEnhet } from '../data/api/datatyper/oppfolgingsstatus';
import { useEffect, useState } from 'react';
import { Enhet, PersonaliaV2Info } from '../data/api/datatyper/personalia';
import { RegistreringsData } from '../data/api/datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { YtelseData } from '../data/api/datatyper/ytelse';
import { OrNothing, StringOrNothing } from '../utils/felles-typer';
// import { compose } from 'msw';

const Overblikk = () => {
    const { fnr } = useAppStore();
    const [veileder, setVeileder] = useState<VeilederData>();
    const [oppfolgingsstatus, setOppfolingsstatus] = useState<OppfolgingsstatusData>();
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);
    const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);
    const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);
    const [ytelser, setYtelser] = useState<YtelseData | null>(null);

    useEffect(() => {
        if (fnr != null) {
            hentOppfolgingsstatus(fnr).then((data) => {
                setOppfolingsstatus(data);
            });
        }
    }, [fnr]);

    useEffect(() => {
        if (fnr != null) {
            hentPersonalia(fnr).then((data) => {
                setPerson(data);
            });
        }
    }, [fnr]);

    useEffect(() => {
        if (fnr != null) {
            hentRegistrering(fnr).then((data) => {
                setRegistrering(data);
            });
        }
    }, [fnr]);

    useEffect(() => {
        if (fnr != null) {
            hentTolk(fnr).then((data) => {
                setTolk(data);
            });
        }
    }, [fnr]);

    useEffect(() => {
        if (fnr != null) {
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

    const veilederNavn: StringOrNothing = veileder?.navn;
    const telefon: StringOrNothing = person?.telefon?.[0].telefonNr; // Henter kun ut 1 tlfnr, flere kan være registrert
    const antallBarn: StringOrNothing = person?.barn?.length.toString();
    // const listeAvBarn = person?.barn.map()
    const oppfolgingsenhet: OppfolgingEnhet | undefined = oppfolgingsstatus?.oppfolgingsenhet;
    const talespraak: StringOrNothing = tolk?.talespraak;
    const sivilstatus: StringOrNothing = person?.sivilstandliste?.[0].sivilstand;
    const brukersMaal: StringOrNothing = oppfolgingsstatus?.hovedmaalkode;
    const ytelserAktivitetsFase: StringOrNothing = ytelser?.vedtaksliste?.[0].aktivitetsfase;
    const geografiskEnhet: OrNothing<Enhet> = person?.geografiskEnhet;
    const regiatrertAv: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const datoRegistrert: StringOrNothing = registrering?.registrering?.opprettetDato;
    const spraak: StringOrNothing = person?.malform;

    return (
        <Panel border className="Panel">
            <Heading spacing level="2" size="large">
                Overblikk
            </Heading>
            <BodyLong className="overblikkContainer">
                <h3>Veileder: {veilederNavn} </h3>
                <h3>Telefon: {telefon} </h3>
                <h3>Antall barn: {antallBarn} </h3>
                <h3>
                    Oppfølgingsenhet: {oppfolgingsenhet?.enhetId} {oppfolgingsenhet?.navn}
                </h3>
                <h3>Tilrettelagt kommunikasjon: {talespraak} </h3>
                <h3>Sivilstatus: {sivilstatus} </h3>
                <h3>Brukers mål: {brukersMaal} </h3>
                <h3>Ytelse(r): {ytelserAktivitetsFase} </h3>
                <h3>
                    Geografisk enhet: {geografiskEnhet?.enhetsnummer} {geografiskEnhet?.navn}
                </h3>
                <h3>Registrert av: {regiatrertAv} </h3>
                <h3>Registrert: {datoRegistrert} </h3>
                <h3>Språk: {spraak} </h3>
            </BodyLong>
        </Panel>
    );
};

export default Overblikk;
