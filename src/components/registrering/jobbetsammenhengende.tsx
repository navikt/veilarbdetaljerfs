import { BodyShort, Label } from '@navikt/ds-react';
import { OrdinaerRegistrering, Registrering } from '../../data/api/datatyper/registreringsData';
import Informasjonsbolk from '../felles/informasjonsbolk';

interface Props {
    registrering: Registrering | undefined;
}

export function JobbetSammenhengende(props: Props) {
    if (!props.registrering) {
        return null;
    }

    const ordinaerRegistrering = props.registrering as OrdinaerRegistrering;

    if (!ordinaerRegistrering.profilering) {
        return null;
    }

    return (
        <Informasjonsbolk
            header="Hentet fra Aa-registeret"
            headerTypo="ingress"
        >
            <Label size="small" as="p">
                Brukeren har vært sammenhengende i jobb minst 6 av de siste 12 måneder
            </Label>
            <BodyShort size="small">
                {ordinaerRegistrering.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder ? 'Ja' : 'Nei'}
            </BodyShort>
        </Informasjonsbolk>
    );
}
