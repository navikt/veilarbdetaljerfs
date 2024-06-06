import { HStack } from '@navikt/ds-react';
import { RegistrertHeader } from './registrertHeader';
import { SporsmalsListe } from './sporsmolvisning';
import PersonverninformasjonUtskrift from '../personverninformasjon-utskrift';
import { Registrering } from '../../../data/api/datatyper/registreringsData';

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
