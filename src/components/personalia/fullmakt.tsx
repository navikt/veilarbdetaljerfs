import { BodyShort } from '@navikt/ds-react';
import { Fullmakt, VergeOgFullmaktData } from '../../data/api/datatyper/vergeOgFullmakt';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formateStringInUpperAndLowerCase, formaterDato } from '../../utils/formater';
import EMDASH from '../../utils/emdash';
import { isNotEmptyArray } from '../../utils/felles-typer';

function FullmektigEllerFullmaktsgiver(props: { fullmakt: Fullmakt }) {
    const { motpartsPersonident, motpartsPersonNavn, motpartsRolle, omraader, gyldigFraOgMed, gyldigTilOgMed } =
        props.fullmakt;
    const { fornavn, mellomnavn, etternavn } = motpartsPersonNavn;

    const gjeldendeOmraader = omraader.map((omraade) => omraade.beskrivelse).join(', ');

    return (
        <div className="underinformasjon">
            <BodyShort size="small" className="body_header">
                <b>
                    {formateStringInUpperAndLowerCase(motpartsRolle)}: {motpartsPersonident}
                </b>
            </BodyShort>
            <BodyShort size="small">{`${fornavn} ${mellomnavn || ''} ${etternavn}`}</BodyShort>
            <BodyShort size="small">{`Gjelder ${gjeldendeOmraader}`}</BodyShort>
            <BodyShort size="small" className="typografi_dato">
                Gyldig fra og med: {formaterDato(gyldigFraOgMed)}
            </BodyShort>
            <BodyShort size="small" className="typografi_dato">
                Gyldig til og med: {formaterDato(gyldigTilOgMed)}
            </BodyShort>
        </div>
    );
}

function Fullmakter(props: Pick<VergeOgFullmaktData, 'fullmakter'>) {
    const { fullmakter: fullmakter } = props;

    const Fullmaktinnhold = () => {
        if (isNotEmptyArray(fullmakter)) {
            return fullmakter.map((fullmakt, index) => (
                <FullmektigEllerFullmaktsgiver fullmakt={fullmakt} key={index} />
            ));
        } else {
            return <>{EMDASH}</>;
        }
    };

    return (
        <Informasjonsbolk header="Fullmakter" headerTypo="ingress">
            <Fullmaktinnhold />
        </Informasjonsbolk>
    );
}

export default Fullmakter;
