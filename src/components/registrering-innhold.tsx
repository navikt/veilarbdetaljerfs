import { Alert, HStack } from '@navikt/ds-react';
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

    if (registreringError?.status === 204 || registreringError?.status === 404 || !registreringData?.registrering) {
        return (
            <Alert inline variant="info" size="small">
                Brukeren har ikke registrert seg via den nye registreringsløsningen.
            </Alert>
        );
    } else if (registreringError) {
        return <Errormelding />;
    }

    const brukerRegistrering = registreringData?.registrering;
    const type = registreringData?.type;

    return (
        <HStack gap="4">
            <RegistrertHeader registrering={brukerRegistrering} />
            <SporsmalsListe registrering={brukerRegistrering} />
            <JobbetSammenhengende registrering={brukerRegistrering} />
            {brukerRegistrering && brukerRegistrering.manueltRegistrertAv != null && (
                <PersonverninformasjonUtskrift type={type} />
            )}
            <ForeslattProfilering registrering={brukerRegistrering} />
        </HStack>
    );
};

export default Registreringsinnhold;
