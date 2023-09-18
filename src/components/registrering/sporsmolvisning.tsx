import { Registrering, Sporsmal } from '../../data/api/datatyper/registreringsData';
import { EndringIRegistreringsdata } from '../../data/api/datatyper/endringIRegistreringsData';
import { mapEndretSvarFraRegistrering } from './mapEndretSvarFraRegistrering';
import { formaterDato, formateStringInUpperAndLowerCase } from '../../utils/formater';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import '../fellesStyling.css';

export const SporsmalsListe = (props: {
    registrering?: Registrering;
    endringerIRegistreringsdata?: EndringIRegistreringsdata;
}) => {
    if (!props.registrering || !props.registrering.teksterForBesvarelse) {
        return null;
    }

    const sporsmaal = props.registrering.teksterForBesvarelse;

    return (
        <span className="info_container">
            {sporsmaal
                .map((s) => mapEndretSvarFraRegistrering(s, props.endringerIRegistreringsdata))
                .map(sporsmalvisning)}
        </span>
    );
};

const sporsmalvisning = (sporsmal: Sporsmal) => {
    return (
        <div key={sporsmal.sporsmalId}>
            <BodyShort size="small" className="body_header">
                {sporsmal.sporsmal}
            </BodyShort>
            <BodyShort size="small" className="enkeltinfo_value">
                <BodyShort as="span" size="small">
                    {sporsmal.svar ?? EMDASH}
                </BodyShort>
                {sporsmal.endretDato && (
                    <>
                        <br />
                        <BodyShort as="span" className="registrering_dato" size="small">
                            {`Endret: ${formaterDato(sporsmal.endretDato)}`}
                        </BodyShort>
                    </>
                )}
                {sporsmal.endretAv && (
                    <>
                        <br />
                        <BodyShort as="span" size="small" className="registrering_dato">
                            {`Endret av: ${formateStringInUpperAndLowerCase(sporsmal.endretAv)}`}
                        </BodyShort>
                    </>
                )}
            </BodyShort>
        </div>
    );
};
