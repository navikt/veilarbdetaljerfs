import { BodyShort, Detail } from '@navikt/ds-react';
import { Fullmakter, VergeOgFullmaktData } from '../../data/api/datatyper/vergeOgFullmakt';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato, isNotEmptyArray } from '../../utils/formater';
import EMDASH from '../../utils/emdash';

function FullmaktigEllerFullmaktsgiver(props: { fullmakt: Fullmakter }) {
    const { motpartsPersonident, motpartsPersonNavn, motpartsRolle, omraader, gyldigFraOgMed, gyldigTilOgMed } =
        props.fullmakt;
    const { fornavn, mellomnavn, etternavn } = motpartsPersonNavn;

    const gjeldendeOmraader = omraader.map((omraade) => omraade.beskrivelse).join(', ');

    return (
        <div>
            <div className="underinformasjon innrykk">
                <Detail>
                    <b>
                        {motpartsRolle?.substring(1).toLowerCase()}: {motpartsPersonident}
                    </b>
                </Detail>
                <BodyShort>{`${fornavn} ${mellomnavn || ''} ${etternavn}`}</BodyShort>
                <BodyShort>{`Gjelder ${gjeldendeOmraader}`}</BodyShort>
                <BodyShort>Gyldig fra og med: {formaterDato(gyldigFraOgMed)}</BodyShort>
                <BodyShort>Gyldig til og med: {formaterDato(gyldigTilOgMed)}</BodyShort>
            </div>
        </div>
    );
}

function Fullmakt(props: Pick<VergeOgFullmaktData, 'fullmakt'>) {
    const { fullmakt } = props;

    let fullmaktListe;

    if (isNotEmptyArray(fullmakt)) {
        fullmaktListe = fullmakt.map((fullmakt, index) => (
            <FullmaktigEllerFullmaktsgiver fullmakt={fullmakt} key={index} />
        ));
    } else {
        return <Informasjonsbolk header="Fullmakter">{EMDASH}</Informasjonsbolk>;
    }

    return <Informasjonsbolk header="Fullmakter">{fullmaktListe}</Informasjonsbolk>;
}

export default Fullmakt;
