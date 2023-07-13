import { BodyShort } from '@navikt/ds-react';
import { Fullmakter, VergeOgFullmaktData } from '../../data/api/datatyper/vergeOgFullmakt';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato, isNotEmptyArray } from '../../utils/formater';
import EMDASH from '../../utils/emdash';

function FullmektigEllerFullmaktsgiver(props: { fullmakt: Fullmakter }) {
    const { motpartsPersonident, motpartsPersonNavn, motpartsRolle, omraader, gyldigFraOgMed, gyldigTilOgMed } =
        props.fullmakt;
    const { fornavn, mellomnavn, etternavn } = motpartsPersonNavn;

    const gjeldendeOmraader = omraader.map((omraade) => omraade.beskrivelse).join(', ');

    return (
        <div className="PersonaliaVerge">
            <BodyShort size="small" className="BodyHeader">
                <b>
                    F{motpartsRolle?.substring(1).toLowerCase()}: {motpartsPersonident}
                </b>
            </BodyShort>
            <BodyShort size="small">{`${fornavn} ${mellomnavn || ''} ${etternavn}`}</BodyShort>
            <BodyShort size="small">{`Gjelder ${gjeldendeOmraader}`}</BodyShort>
            <BodyShort size="small" className="BodyShortItalic">
                Gyldig fra og med: {formaterDato(gyldigFraOgMed)}
            </BodyShort>
            <BodyShort size="small" className="BodyShortItalic">
                Gyldig til og med: {formaterDato(gyldigTilOgMed)}
            </BodyShort>
        </div>
    );
}

function Fullmakt(props: Pick<VergeOgFullmaktData, 'fullmakt'>) {
    const { fullmakt } = props;

    let fullmaktListe;

    if (isNotEmptyArray(fullmakt)) {
        fullmaktListe = fullmakt.map((fullmakt, index) => (
            <FullmektigEllerFullmaktsgiver fullmakt={fullmakt} key={index} />
        ));
    } else {
        return <Informasjonsbolk header="Fullmakter">{EMDASH}</Informasjonsbolk>;
    }

    return (
        <div className="Fullmakter">
            <Informasjonsbolk header="Fullmakter" headerTypo="ingress">
                {fullmaktListe}
            </Informasjonsbolk>
        </div>
    );
}

export default Fullmakt;
