import React from 'react';
import { Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import { useOpplysningerOmArbeidssoekerMedProfilering, useRegistrering } from '../data/api/fetch';
import { Registrering } from '../data/api/datatyper/registreringsData.ts';
import { OpplysningerOmArbeidssoker } from '@navikt/arbeidssokerregisteret-utils';
import { Sykemeldtregistrering } from './registrering/sykemeldtregistrering/sykemeldtregistrering.tsx';
import { Arbeidssoekerregistrering } from './registrering/arbeidssoekerregistrering/arbeidssoekerregistrering.tsx';

const finnGjeldendeRegistrering = (
    sykemeldtRegistrering: Registrering | null,
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssoker | null
) => {
    if (!sykemeldtRegistrering && opplysningerOmArbeidssoeker) {
        return Arbeidssoekerregistrering;
    }
    if (!opplysningerOmArbeidssoeker && sykemeldtRegistrering) {
        return Sykemeldtregistrering;
    }
    if (opplysningerOmArbeidssoeker && sykemeldtRegistrering) {
        return Date.parse(sykemeldtRegistrering.opprettetDato) >
            Date.parse(opplysningerOmArbeidssoeker.sendtInnAv.tidspunkt)
            ? Sykemeldtregistrering
            : Arbeidssoekerregistrering;
    }
    return null;
};

const Registreringsinnhold = () => {
    const { fnr } = useAppStore();

    const { data: registreringData, error: registreringError, isLoading: registreringLoading } = useRegistrering(fnr);

    const {
        data: opplysningerOmArbedissoekerMedProfilering,
        error: opplysningerOmArbedissoekerMedProfileringError,
        isLoading: opplysningerOmArbedissoekerMedProfileringLoading
    } = useOpplysningerOmArbeidssoekerMedProfilering(fnr);

    const harIkkeSykeRegistrering =
        !registreringData?.registrering ||
        registreringError?.status === 204 ||
        registreringError?.status === 404 ||
        registreringData?.type === 'ORDINAER';
    const harIkkeRegistrering =
        opplysningerOmArbedissoekerMedProfileringError?.status == 204 ||
        !opplysningerOmArbedissoekerMedProfilering?.opplysningerOmArbeidssoeker;

    if (registreringLoading || opplysningerOmArbedissoekerMedProfileringLoading) {
        return <Laster />;
    }

    if (harIkkeRegistrering && harIkkeSykeRegistrering) {
        return (
            <Alert inline variant="info" size="small">
                Brukeren har ikke registrert seg via den nye registreringsløsningen.
            </Alert>
        );
    } else if (registreringError || opplysningerOmArbedissoekerMedProfileringError) {
        return <Errormelding />;
    }

    const Element = finnGjeldendeRegistrering(
        registreringData?.registrering ?? null,
        opplysningerOmArbedissoekerMedProfilering?.opplysningerOmArbeidssoeker ?? null
    );
    return Element ? (
        <Element
            sykemeldtregistrering={registreringData?.registrering}
            opplysningerOmArbeidssoekerMedProfilering={
                opplysningerOmArbedissoekerMedProfilering ?? { opplysningerOmArbeidssoeker: null, profilering: null }
            }
            fnr={fnr ?? null}
        />
    ) : null;
};

export default Registreringsinnhold;
