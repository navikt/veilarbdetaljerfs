import React from 'react';
import { Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import { useOpplysningerOmArbeidssoekerMedProfilering } from '../data/api/fetch';
import { Arbeidssoekerregistrering } from './registrering/arbeidssoekerregistrering/arbeidssoekerregistrering';

const Registreringsinnhold = () => {
    const { fnr } = useAppStore();

    const {
        data: opplysningerOmArbedissoekerMedProfilering,
        error: opplysningerOmArbedissoekerMedProfileringError,
        isLoading: opplysningerOmArbedissoekerMedProfileringLoading
    } = useOpplysningerOmArbeidssoekerMedProfilering(fnr);

    const harIkkeRegistrering =
        opplysningerOmArbedissoekerMedProfileringError?.status == 204 ||
        !opplysningerOmArbedissoekerMedProfilering?.arbeidssoekerperiodeStartet;

    const harIkkeOpplysningerMenErRegistrert =
        !!opplysningerOmArbedissoekerMedProfilering?.arbeidssoekerperiodeStartet &&
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
    } else if (harIkkeOpplysningerMenErRegistrert) {
        return (
            <Alert inline variant="warning" size="small">
                Brukeren har en aktiv arbeidssøkerperiode, men vi klarer ikke hente opplysninger om arbeidssøker fra
                arbeidssøkerregisteret.
            </Alert>
        );
    } else if (opplysningerOmArbedissoekerMedProfileringError) {
        return <Errormelding />;
    }

    return (
        <Arbeidssoekerregistrering
            opplysningerOmArbeidssoekerMedProfilering={opplysningerOmArbedissoekerMedProfilering}
            fnr={fnr ?? null}
        />
    );
};

export default Registreringsinnhold;
