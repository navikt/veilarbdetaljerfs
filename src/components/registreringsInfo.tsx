import { Panel, Heading, BodyShort, Alert } from '@navikt/ds-react';
import { DobbeltInformasjon } from './felles/dobbelinfo';
import { RegistreringsData } from '../data/api/datatyper/registreringsData';
import { useEffect, useState } from 'react';
import { hentRegistrering } from '../data/api/fetch';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import { StringOrNothing } from '../utils/felles-typer';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { formaterDato } from '../utils/formater';
import { ForeslattProfilering } from './registrering/foreslatt-profilering';
import { JobbetSammenhengende } from './registrering/jobbetsammenhengende';
import Show from './felles/show';
import PersonverninformasjonUtskrift from './registrering/personverninformasjon-utskrift';

export const Registrering = () => {
    const { fnr } = useAppStore();
    const [registrering, setRegistrering] = useState<RegistreringsData | null | undefined>(null);
    const [lasterRegistreringsdata, setLasterRegistreringsdata] = useState<boolean>(true);
    const [registreringHarFeil, setRegistreringHarFeil] = useState<boolean>(false);

    useEffect(() => {
        const hentRegistreringsData = async () => {
            try {
                setLasterRegistreringsdata(true);
                const _registrering = await hentRegistrering(fnr);
                setRegistrering(_registrering);
            } catch (err) {
                setRegistreringHarFeil(true);
            } finally {
                setLasterRegistreringsdata(false);
            }
        };

        hentRegistreringsData();
    }, [fnr]);

    if (lasterRegistreringsdata) {
        return (
            <Panel border className="info_panel" tabIndex={6}>
                <Laster />
            </Panel>
        );
    }

    if (registreringHarFeil) {
        return (
            <Panel border className="info_panel" tabIndex={6}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Registrering
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const registrertAvNavn: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const registrertAvEnhetID: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.id;
    const registrertAvIdent: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.ident;
    const datoRegistrert: StringOrNothing = registrering?.registrering?.opprettetDato;

    const regDataSisteStilling = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'sisteStilling'
    );
    const sisteStillingSvar: StringOrNothing = regDataSisteStilling?.svar;
    const sisteStillingSpor: StringOrNothing = regDataSisteStilling?.sporsmal || 'Din siste jobb';

    const regDataUtdanning = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanning'
    );
    const utdanningSvar: StringOrNothing = regDataUtdanning?.svar;
    const utdanningSpor: StringOrNothing = regDataUtdanning?.sporsmal || 'Hva er din høyeste fullførte utdanning?';

    const regDataUtdanningGodkjent = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningGodkjent'
    );
    const UtdanningGodkjentSvar: StringOrNothing = regDataUtdanningGodkjent?.svar;
    const UtdanningGodkjentSpor: StringOrNothing =
        regDataUtdanningGodkjent?.sporsmal || 'Er utdanningen din godkjent i Norge?';

    const regDataUtdanningBestatt = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningBestatt'
    );
    const UtdanningBestattSvar: StringOrNothing = regDataUtdanningBestatt?.svar;
    const UtdanningBestattSpor: StringOrNothing = regDataUtdanningBestatt?.sporsmal || 'Er utdanningen din bestått?';

    const regDataHelse = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'helseHinder'
    );
    const HelseSvar: StringOrNothing = regDataHelse?.svar;
    const HelseSpor: StringOrNothing =
        regDataHelse?.sporsmal || 'Trenger du oppfølging i forbindelse med helseutfordringer?';

    const regDataAnnet = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'andreForhold'
    );
    const AnnetSvar: StringOrNothing = regDataAnnet?.svar;
    const AnnetSpor: StringOrNothing =
        regDataAnnet?.sporsmal || 'Trenger du oppfølging i forbindelse med andre utfordringer?';

    const brukerRegistrering = registrering?.registrering;
    const type = registrering?.type;

    if (!registrering) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Registering
                </Heading>
                <Alert inline variant="info">
                    Brukeren har ikke registrert seg
                </Alert>
            </Panel>
        );
    }
    const regIdNavn = registrering.registrering?.manueltRegistrertAv?.enhet
        ? registrertAvEnhetID + ' ' + registrertAvNavn
        : '';
    const regDato = registrering.registrering?.opprettetDato ? 'Registrert: ' + formaterDato(datoRegistrert) : '';
    const regAv = registrering.registrering?.manueltRegistrertAv?.enhet
        ? 'Registrert av: ' + registrertAvIdent + ', ' + regIdNavn
        : 'Registrert av: ' + registrertAvIdent;

    const regValues = registrering.registrering?.manueltRegistrertAv ? [`${regDato}`, `${regAv}`] : [regDato];

    const registrertAv = registrering.registrering?.manueltRegistrertAv?.enhet
        ? `Registrert av ${registrertAvNavn}`
        : 'Brukerens svar fra registreringen';

    return (
        <Panel border className="info_panel" tabIndex={6}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
                Registering
            </Heading>
            <DobbeltInformasjon header={registrertAv} values={regValues ? regValues : [EMDASH]} />
            <span className="info_container">
                <EnkeltInformasjon header={HelseSpor} value={HelseSvar} />
                <EnkeltInformasjon header={AnnetSpor} value={AnnetSvar} />
                <EnkeltInformasjon header={sisteStillingSpor} value={sisteStillingSvar} />
                <EnkeltInformasjon header={utdanningSpor} value={utdanningSvar} />
                <EnkeltInformasjon header={UtdanningGodkjentSpor} value={UtdanningGodkjentSvar} />
                <EnkeltInformasjon header={UtdanningBestattSpor} value={UtdanningBestattSvar} />
            </span>
            <span className="registrering_nedre_container">
                <JobbetSammenhengende registrering={brukerRegistrering} />
                <Show if={brukerRegistrering && brukerRegistrering.manueltRegistrertAv != null}>
                    <PersonverninformasjonUtskrift type={type} />
                </Show>
                <ForeslattProfilering registrering={brukerRegistrering} />
            </span>
        </Panel>
    );
};
