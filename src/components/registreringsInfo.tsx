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
import { useRegistrering } from '../data/api/fetchv2';

export const Registrering = () => {
    const { fnr } = useAppStore();

    const registrering = useRegistrering(fnr);

    if (registrering.isLoading) {
        return (
            <Panel border className="info_panel" tabIndex={6}>
                <Laster />
            </Panel>
        );
    }

    if (registrering.error) {
        return (
            <Panel border className="info_panel" tabIndex={6}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Registrering
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const registrertAvNavn: StringOrNothing = registrering?.data?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const registrertAvEnhetID: StringOrNothing = registrering?.data?.registrering?.manueltRegistrertAv?.enhet?.id;
    const registrertAvIdent: StringOrNothing = registrering?.data?.registrering?.manueltRegistrertAv?.ident;
    const datoRegistrert: StringOrNothing = registrering?.data?.registrering?.opprettetDato;

    const regDataSisteStilling = registrering?.data?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'sisteStilling'
    );
    const sisteStillingSvar: StringOrNothing = regDataSisteStilling?.svar;
    const sisteStillingSpor: StringOrNothing = regDataSisteStilling?.sporsmal || 'Din siste jobb';

    const regDataUtdanning = registrering?.data?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanning'
    );
    const utdanningSvar: StringOrNothing = regDataUtdanning?.svar;
    const utdanningSpor: StringOrNothing = regDataUtdanning?.sporsmal || 'Hva er din høyeste fullførte utdanning?';

    const regDataUtdanningGodkjent = registrering?.data?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningGodkjent'
    );
    const UtdanningGodkjentSvar: StringOrNothing = regDataUtdanningGodkjent?.svar;
    const UtdanningGodkjentSpor: StringOrNothing =
        regDataUtdanningGodkjent?.sporsmal || 'Er utdanningen din godkjent i Norge?';

    const regDataUtdanningBestatt = registrering?.data?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningBestatt'
    );
    const UtdanningBestattSvar: StringOrNothing = regDataUtdanningBestatt?.svar;
    const UtdanningBestattSpor: StringOrNothing = regDataUtdanningBestatt?.sporsmal || 'Er utdanningen din bestått?';

    const regDataHelse = registrering?.data?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'helseHinder'
    );
    const HelseSvar: StringOrNothing = regDataHelse?.svar;
    const HelseSpor: StringOrNothing =
        regDataHelse?.sporsmal || 'Trenger du oppfølging i forbindelse med helseutfordringer?';

    const regDataAnnet = registrering?.data?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'andreForhold'
    );
    const AnnetSvar: StringOrNothing = regDataAnnet?.svar;
    const AnnetSpor: StringOrNothing =
        regDataAnnet?.sporsmal || 'Trenger du oppfølging i forbindelse med andre utfordringer?';

    const brukerRegistrering = registrering?.data?.registrering;
    const type = registrering?.data?.type;

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
    const regIdNavn = registrering.data?.registrering?.manueltRegistrertAv?.enhet
        ? registrertAvEnhetID + ' ' + registrertAvNavn
        : '';
    const regDato = registrering.data?.registrering?.opprettetDato ? 'Registrert: ' + formaterDato(datoRegistrert) : '';
    const regAv = registrering.data?.registrering?.manueltRegistrertAv?.enhet
        ? 'Registrert av: ' + registrertAvIdent + ', ' + regIdNavn
        : 'Registrert av: ' + registrertAvIdent;

    const regValues = registrering.data?.registrering?.manueltRegistrertAv ? [`${regDato}`, `${regAv}`] : [regDato];

    const registrertAv = registrering.data?.registrering?.manueltRegistrertAv?.enhet
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
