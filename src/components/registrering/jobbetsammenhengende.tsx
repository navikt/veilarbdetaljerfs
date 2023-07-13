import { BodyShort, Label, Heading } from '@navikt/ds-react';
import { OrdinaerRegistrering, Registrering } from '../../data/api/datatyper/registreringsData';

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
        <>
            {' '}
            <div>
                <Heading spacing level="2" size="small">
                    Hentet fra Aa-registeret
                </Heading>
                <Label size="small" as="p">
                    Brukeren har vært sammenhengende i jobb minst 6 av de siste 12 måneder
                </Label>
                <BodyShort size="small">
                    {ordinaerRegistrering.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder ? 'Ja' : 'Nei'}{' '}
                </BodyShort>{' '}
            </div>
        </>
    );
}
