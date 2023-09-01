import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import { OrdinaerRegistrering, Registrering } from '../../data/api/datatyper/registreringsData';
import './registrering.css';
import { innsatsgruppeBeskrivelse } from '../../utils/text-mapper';

interface Props {
    registrering: Registrering | undefined | null;
}

export function ForeslattProfilering(props: Props) {
    if (!props.registrering) {
        return null;
    }

    const ordinaerRegistrering = props.registrering as OrdinaerRegistrering;

    if (!ordinaerRegistrering.profilering) {
        return null;
    }

    return (
        <Panel border>
            <Heading level="4" size="small">
                Forslag om brukers muligheter og behov (resultat fra profilering)
            </Heading>
            <BodyShort size="small">
                {innsatsgruppeBeskrivelse(ordinaerRegistrering.profilering.innsatsgruppe)}
            </BodyShort>
        </Panel>
    );
}
