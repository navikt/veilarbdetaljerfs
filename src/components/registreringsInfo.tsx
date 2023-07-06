import { Panel, Heading } from '@navikt/ds-react';
import { DobbeltInformasjon } from './felles/dobbelinfo';
import { RegistreringsData } from '../data/api/datatyper/registreringsData';
import { useEffect, useState } from 'react';
import { hentRegistrering } from '../data/api/fetch';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomkomponenter';
import { StringOrNothing } from '../utils/felles-typer';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { formaterDato } from '../utils/formater';
import { ForeslattProfilering } from './registrering/foreslatt-profilering';
import { JobbetSammenhengende } from './jobbetsammenhengende';
import Show from './felles/show';
import PersonverninformasjonUtskrift from './registrering/personverninformasjon-utskrift';

export const Registrering = () => {
    const { fnr } = useAppStore();
    const [registrering, setRegistrering] = useState<RegistreringsData | null | undefined>(null);
    const [lasterRegistreringsdata, setLasterRegistreringsdata] = useState<boolean>(true);
    const [registreringHarFeil, setRegistreringHarFeil] = useState<boolean>(false);

    useEffect(() => {
        const hentOverblikkData = async () => {
            try {
                setLasterRegistreringsdata(true);
                const [_registrering] = await Promise.all([hentRegistrering(fnr)]);
                setRegistrering(_registrering);
            } catch (err) {
                setRegistreringHarFeil(true);
            } finally {
                setLasterRegistreringsdata(false);
            }
        };

        hentOverblikkData();
    }, [fnr]);

    if (lasterRegistreringsdata) {
        return (
            <Panel border className="info_panel">
                <Laster />
            </Panel>
        );
    }

    if (registreringHarFeil) {
        return (
            <Panel border className="info_panel">
                <Errormelding />
            </Panel>
        );
    }

    const registrertAvNavn: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const registrertAvID: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.id;
    const registrertAvIdent: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.ident;
    const datoRegistrert: StringOrNothing = registrering?.registrering?.opprettetDato;

    const regDataHvorfor = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'dinSituasjon'
    );
    const hvorforSvar: StringOrNothing = regDataHvorfor?.svar;

    const regDataSisteStilling = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'sisteStilling'
    );
    const sisteStillingSvar: StringOrNothing = regDataSisteStilling?.svar;

    const regDataUtdanning = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanning'
    );
    const UtdanningSvar: StringOrNothing = regDataUtdanning?.svar;

    const regDataUtdanningGodkjent = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningGodkjent'
    );
    const UtdanningGodkjentSvar: StringOrNothing = regDataUtdanningGodkjent?.svar;

    const regDataUtdanningBestatt = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningBestatt'
    );
    const UtdanningBestattSvar: StringOrNothing = regDataUtdanningBestatt?.svar;

    const regDataHelse = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'helseHinder'
    );
    const HelseSvar: StringOrNothing = regDataHelse?.svar;

    const regDataAnnet = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'andreForhold'
    );
    const AnnetSvar: StringOrNothing = regDataAnnet?.svar;

    const regIdNavn = registrertAvID + ' ' + registrertAvNavn;
    const regDato = 'Registrert: ' + formaterDato(datoRegistrert);
    const regAv = 'Registrert av: ' + registrertAvIdent + ', ' + regIdNavn;

    const regValues = [`${regDato}`, `${regAv}`];

    const brukerRegistrering = registrering?.registrering;
    const type = registrering?.type;

    return (
        <Panel border className="info_panel">
            <Heading spacing level="2" size="large">
                Registering
            </Heading>
            <DobbeltInformasjon header={regAv ? regAv : EMDASH} values={regValues ? regValues : [EMDASH]} />
            <span className="info_container">
                <EnkeltInformasjon header="Hvorfor registrerer du deg?" value={hvorforSvar ? hvorforSvar : EMDASH} />
                <EnkeltInformasjon header="Din siste jobb" value={sisteStillingSvar ? sisteStillingSvar : EMDASH} />
                <EnkeltInformasjon
                    header="Hva er din høyeste fullførte utdanning?"
                    value={UtdanningSvar ? UtdanningSvar : EMDASH}
                />
                <EnkeltInformasjon
                    header="Er utdanningen din godkjent i Norge?"
                    value={UtdanningGodkjentSvar ? UtdanningGodkjentSvar : EMDASH}
                />
                <EnkeltInformasjon
                    header="Er utdanningen din bestått?"
                    value={UtdanningBestattSvar ? UtdanningBestattSvar : EMDASH}
                />
                <EnkeltInformasjon
                    header="Trenger du oppfølging i forbindelse med helseutfordringer?"
                    value={HelseSvar ? HelseSvar : EMDASH}
                />
                <EnkeltInformasjon
                    header="Trenger du oppfølging i forbindelse med andre utfordringer?"
                    value={AnnetSvar ? AnnetSvar : EMDASH}
                />
                <br />
                <JobbetSammenhengende registrering={brukerRegistrering} />
                <br />
                <Show if={brukerRegistrering && brukerRegistrering.manueltRegistrertAv != null}>
                    <PersonverninformasjonUtskrift type={type} />
                </Show>
            </span>
            <ForeslattProfilering registrering={brukerRegistrering} />
        </Panel>
    );
};
