import React from 'react';
import { Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { AlertMedFeilkode } from './felles/alert-med-feilkode.tsx';
import { useOpplysningerOmArbeidssoekerMedProfilering } from '../data/api/fetch';
import { Arbeidssoekerregistrering } from './registrering/arbeidssoekerregistrering/arbeidssoekerregistrering';
import { Laster } from './felles/laster.tsx';

const Registreringsinnhold = () => {
    const { fnr } = useAppStore();

    const {
        data: opplysningerOmArbedissoekerMedProfilering,
        error: opplysningerOmArbedissoekerMedProfileringError,
        isLoading: opplysningerOmArbedissoekerMedProfileringLoading
    } = useOpplysningerOmArbeidssoekerMedProfilering(fnr);

    const harIkkeRegistrering =
        opplysningerOmArbedissoekerMedProfileringError?.status == 204 ||
        !opplysningerOmArbedissoekerMedProfilering?.opplysningerOmArbeidssoeker;

    if (opplysningerOmArbedissoekerMedProfileringLoading) {
        return <Laster />;
    }

    if (harIkkeRegistrering) {
        return (
            <Alert inline variant="info" size="small">
                Brukeren har ikke registrert seg i Arbeidssøkerregisteret og har ikke en aktiv arbeidssøkerperiode.
            </Alert>
        );
    } else if (opplysningerOmArbedissoekerMedProfileringError) {
        return (
            <AlertMedFeilkode feilkode={opplysningerOmArbedissoekerMedProfileringError?.korrelasjonsId}>
                Noe gikk galt! Prøv igjen om noen minutter.
            </AlertMedFeilkode>
        );
    }

    return (
        <Arbeidssoekerregistrering
            opplysningerOmArbeidssoekerMedProfilering={opplysningerOmArbedissoekerMedProfilering}
            fnr={fnr ?? null}
        />
    );
};

export default Registreringsinnhold;
