import { BodyShort, Ingress, Panel } from '@navikt/ds-react';
import { InnsatsgruppeType, OrdinaerRegistrering, Registrering } from '../../data/api/datatyper/registreringsData';
import './reg.css';

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
        <Panel border className="profilering_boks">
            <Ingress>Forslag om brukers muligheter og behov (resultat fra profilering)</Ingress>
            <BodyShort>{innsatsgruppeBeskrivelse(ordinaerRegistrering.profilering.innsatsgruppe)}</BodyShort>
        </Panel>
    );
}

function innsatsgruppeBeskrivelse(innsatsgruppe: InnsatsgruppeType) {
    switch (innsatsgruppe) {
        case 'STANDARD_INNSATS':
            return 'Antatt rask overgang til arbeid: Vurdér om brukeren har gode muligheter til å beholde eller komme i jobb på egenhånd.';
        case 'SITUASJONSBESTEMT_INNSATS':
            return 'Antatt behov for veiledning: Vurdér brukerens jobbmuligheter og behov for veiledning.';
        case 'BEHOV_FOR_ARBEIDSEVNEVURDERING':
            return 'Brukeren har oppgitt hindringer: Vurdér brukerens jobbmuligheter og behov for veiledning.';
        default:
            return '';
    }
}
