import { Panel, Heading, Alert } from '@navikt/ds-react';
import { DobbeltInformasjon } from './felles/dobbelinfo';
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
import { useRegistrering } from '../data/api/fetch';

export const Registrering = () => {
    const { fnr } = useAppStore();

    const { data: registreringData, error: registreringError, isLoading: registreringLoading } = useRegistrering(fnr);

    if (registreringLoading) {
        return (
            <Panel border className="info_panel" tabIndex={6}>
                <Laster />
            </Panel>
        );
    }

    if (registreringError?.status === 204 || registreringError?.status === 404) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (registreringError) {
        return (
            <Panel border className="info_panel" tabIndex={6}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Registrering
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const registrertAvNavn: StringOrNothing = registreringData?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const registrertAvEnhetID: StringOrNothing = registreringData?.registrering?.manueltRegistrertAv?.enhet?.id;
    const registrertAvIdent: StringOrNothing = registreringData?.registrering?.manueltRegistrertAv?.ident;
    const datoRegistrert: StringOrNothing = registreringData?.registrering?.opprettetDato;

    const regDataSisteStilling = registreringData?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'sisteStilling'
    );
    const sisteStillingSvar: StringOrNothing = regDataSisteStilling?.svar;
    const sisteStillingSpor: StringOrNothing = regDataSisteStilling?.sporsmal || 'Din siste jobb';

    const regDataUtdanning = registreringData?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanning'
    );
    const utdanningSvar: StringOrNothing = regDataUtdanning?.svar;
    const utdanningSpor: StringOrNothing = regDataUtdanning?.sporsmal || 'Hva er din høyeste fullførte utdanning?';

    const regDataUtdanningGodkjent = registreringData?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningGodkjent'
    );
    const UtdanningGodkjentSvar: StringOrNothing = regDataUtdanningGodkjent?.svar;
    const UtdanningGodkjentSpor: StringOrNothing =
        regDataUtdanningGodkjent?.sporsmal || 'Er utdanningen din godkjent i Norge?';

    const regDataUtdanningBestatt = registreringData?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningBestatt'
    );
    const UtdanningBestattSvar: StringOrNothing = regDataUtdanningBestatt?.svar;
    const UtdanningBestattSpor: StringOrNothing = regDataUtdanningBestatt?.sporsmal || 'Er utdanningen din bestått?';

    const regDataHelse = registreringData?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'helseHinder'
    );
    const HelseSvar: StringOrNothing = regDataHelse?.svar;
    const HelseSpor: StringOrNothing =
        regDataHelse?.sporsmal || 'Trenger du oppfølging i forbindelse med helseutfordringer?';

    const regDataAnnet = registreringData?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'andreForhold'
    );
    const AnnetSvar: StringOrNothing = regDataAnnet?.svar;
    const AnnetSpor: StringOrNothing =
        regDataAnnet?.sporsmal || 'Trenger du oppfølging i forbindelse med andre utfordringer?';

    const brukerRegistrering = registreringData?.registrering;
    const type = registreringData?.type;

    if (!registreringData) {
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
    const regIdNavn = registreringData?.registrering?.manueltRegistrertAv?.enhet
        ? registrertAvEnhetID + ' ' + registrertAvNavn
        : '';
    const regDato = registreringData?.registrering?.opprettetDato ? 'Registrert: ' + formaterDato(datoRegistrert) : '';
    const regAv = registreringData?.registrering?.manueltRegistrertAv?.enhet
        ? 'Registrert av: ' + registrertAvIdent + ', ' + regIdNavn
        : 'Registrert av: ' + registrertAvIdent;

    const regValues = registreringData?.registrering?.manueltRegistrertAv ? [`${regDato}`, `${regAv}`] : [regDato];

    const registrertAv = registreringData?.registrering?.manueltRegistrertAv?.enhet
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
