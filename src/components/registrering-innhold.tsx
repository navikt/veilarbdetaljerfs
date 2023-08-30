import { Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import { ForeslattProfilering } from './registrering/foreslatt-profilering';
import { JobbetSammenhengende } from './registrering/jobbetsammenhengende';
import PersonverninformasjonUtskrift from './registrering/personverninformasjon-utskrift';
import { useRegistrering } from '../data/api/fetch';
import { SporsmalsListe } from './registrering/sporsmolvisning';
import { RegistrertHeader } from './registrering/registrert';

const Registreringsinnhold = () => {
    const { fnr } = useAppStore();

    const { data: registreringData, error: registreringError, isLoading: registreringLoading } = useRegistrering(fnr);

    if (registreringLoading) {
        return <Laster />;
    }

    if (registreringError?.status === 204 || registreringError?.status === 404 || !registreringData) {
        return (
            <Alert inline variant="info">
                Brukeren har ikke registrert seg
            </Alert>
        );
    } else if (registreringError) {
        return <Errormelding />;
    }

    const brukerRegistrering = registreringData?.registrering;
    const type = registreringData?.type;

    return (
        <>
            <RegistrertHeader registrering={brukerRegistrering} />
            <SporsmalsListe registrering={brukerRegistrering} />
            <span className="registrering_nedre_container">
                <JobbetSammenhengende registrering={brukerRegistrering} />
                {brukerRegistrering && brukerRegistrering.manueltRegistrertAv != null && (
                    <PersonverninformasjonUtskrift type={type} />
                )}
                <ForeslattProfilering registrering={brukerRegistrering} />
            </span>
        </>
    );
};

export default Registreringsinnhold;
