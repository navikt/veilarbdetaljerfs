import { HStack } from '@navikt/ds-react';
import { RegistrertHeader } from './registrertHeader.tsx';
import { SporsmalsListe } from './sporsmolvisning.tsx';
import PersonverninformasjonUtskrift from '../personverninformasjon-utskrift.tsx';
import { Registrering } from '../../../data/api/datatyper/registreringsData.ts';

interface Props {
    sykemeldtregistrering?: Registrering;
}
export const Sykemeldtregistrering = ({ sykemeldtregistrering }: Props) => {
    if (!sykemeldtregistrering) {
        return null;
    }

    return (
        <HStack gap="4">
            <RegistrertHeader registrering={sykemeldtregistrering} />
            <SporsmalsListe registrering={sykemeldtregistrering} />
            {sykemeldtregistrering.manueltRegistrertAv != null && <PersonverninformasjonUtskrift type="SYKMELDT" />}
        </HStack>
    );
};
