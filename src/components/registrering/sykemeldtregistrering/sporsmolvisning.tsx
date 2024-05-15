import { Registrering } from '../../../data/api/datatyper/registreringsData.ts';
import '../../fellesStyling.css';
import { Sporsmalvisning } from '../sporsmalsvisning.tsx';

export const SporsmalsListe = (props: { registrering?: Registrering }) => {
    if (!props.registrering || !props.registrering.teksterForBesvarelse) {
        return null;
    }

    return (
        <span className="info_container">
            {props.registrering.teksterForBesvarelse.map(({ sporsmal, svar }) => Sporsmalvisning({ sporsmal, svar }))}
        </span>
    );
};
