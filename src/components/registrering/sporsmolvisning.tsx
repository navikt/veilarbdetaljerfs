import { Registrering, Sporsmal } from '../../data/api/datatyper/registreringsData';
import { EnkeltInformasjon } from '../felles/enkeltInfo';

export const SporsmalsListe = (props: { registrering?: Registrering }) => {
    if (!props.registrering || !props.registrering.teksterForBesvarelse) {
        return null;
    }

    const sporsmaal = props.registrering.teksterForBesvarelse;

    return <span className="info_container">{sporsmaal.map(sporsmalvisning)}</span>;
};

const sporsmalvisning = (sporsmal: Sporsmal) => {
    return <EnkeltInformasjon header={sporsmal.sporsmal} value={sporsmal.svar} key={sporsmal.sporsmalId} />;
};
