import { Heading, Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import { ForeslattProfilering } from './registrering/foreslatt-profilering';
import { JobbetSammenhengende } from './registrering/jobbetsammenhengende';
import Show from './felles/show';
import PersonverninformasjonUtskrift from './registrering/personverninformasjon-utskrift';
import { useRegistrering } from '../data/api/fetch';
import { SporsmalsListe } from './registrering/sporsmolvisning';
import { RegistrertHeader } from './registrering/registrert';

const Registreringsinnhold = () => {
    const { fnr } = useAppStore();

    const { data: registreringData, error: registreringError, isLoading: registreringLoading } = useRegistrering(fnr);

    if (registreringLoading) {
        return (
            <>
                <Heading spacing level="2" size="medium" className="panel_header">
                    Registering
                </Heading>
                <Laster />
            </>
        );
    }

    if (registreringError?.status === 204 || registreringError?.status === 404 || !registreringData) {
        return (
            <>
                <Heading spacing level="2" size="medium" className="panel_header">
                    Registering
                </Heading>
                <Alert inline variant="info">
                    Brukeren har ikke registrert seg
                </Alert>
            </>
        );
    } else if (registreringError) {
        return (
            <>
                <Heading spacing level="2" size="medium" className="panel_header">
                    Registrering
                </Heading>
                <Errormelding />
            </>
        );
    }

    const brukerRegistrering = registreringData?.registrering;
    const type = registreringData?.type;

    return (
        <>
            <Heading spacing level="2" size="medium" className="panel_header">
                Registering
            </Heading>
            <RegistrertHeader registrering={brukerRegistrering} />
            <SporsmalsListe registrering={brukerRegistrering} />
            <span className="registrering_nedre_container">
                <JobbetSammenhengende registrering={brukerRegistrering} />
                <Show if={brukerRegistrering && brukerRegistrering.manueltRegistrertAv != null}>
                    <PersonverninformasjonUtskrift type={type} />
                </Show>
                <ForeslattProfilering registrering={brukerRegistrering} />
            </span>
        </>
    );
};

export default Registreringsinnhold;
