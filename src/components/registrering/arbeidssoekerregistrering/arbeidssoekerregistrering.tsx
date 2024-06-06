import { HStack } from '@navikt/ds-react';
import { RegistrertHeader } from './registrertHeader';

import { SporsmalsListe } from './sporsmlsvisning';
import React from 'react';
import { JobbetSammenhengende } from './jobbetsammenhengende';
import PersonverninformasjonUtskrift from '../personverninformasjon-utskrift';
import { ForeslattProfilering } from './foreslatt-profilering';
import { OpplysningerOmArbeidssokerMedProfilering } from '../../../data/api/fetch';

interface Props {
    opplysningerOmArbeidssoekerMedProfilering: OpplysningerOmArbeidssokerMedProfilering;
    fnr: string | null;
}

export const Arbeidssoekerregistrering = ({
    opplysningerOmArbeidssoekerMedProfilering: { opplysningerOmArbeidssoeker, profilering },
    fnr
}: Props) => {
    if (!opplysningerOmArbeidssoeker) {
        return null;
    }

    return (
        <HStack gap="4">
            <RegistrertHeader sendtInnAv={opplysningerOmArbeidssoeker.sendtInnAv} />
            <SporsmalsListe opplysningerOmArbeidssoeker={opplysningerOmArbeidssoeker} />
            {profilering && <JobbetSammenhengende profilering={profilering} />}
            {opplysningerOmArbeidssoeker.sendtInnAv.utfoertAv.type === 'VEILEDER' && (
                <PersonverninformasjonUtskrift type="ORDINAER" />
            )}
            {profilering && fnr && <ForeslattProfilering profilering={profilering} fnr={fnr} />}
        </HStack>
    );
};
