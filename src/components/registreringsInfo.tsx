import { Panel, Heading, Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import { ForeslattProfilering } from './registrering/foreslatt-profilering';
import { JobbetSammenhengende } from './registrering/jobbetsammenhengende';
import Show from './felles/show';
import PersonverninformasjonUtskrift from './registrering/personverninformasjon-utskrift';
import { useRegistrering } from '../data/api/fetch';
import { SporsmalsListe } from './registrering/sporsmolvisning';
import { RegistrertHeader } from './registrering/registrert';

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

    if (registreringError?.status === 204 || registreringError?.status === 404 || !registreringData) {
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

    const brukerRegistrering = registreringData?.registrering;
    const type = registreringData?.type;

    return (
        <Panel border className="info_panel" tabIndex={6}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
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
        </Panel>
    );
};
