import { BodyShort } from '@navikt/ds-react';
import { Fullmakter, VergeOgFullmaktData } from '../../data/api/datatyper/vergeOgFullmakt';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formateStringInUpperAndLowerCase, formaterDato } from '../../utils/formater';
import EMDASH from '../../utils/emdash';
import { isNotEmptyArray } from '../../utils/felles-typer';
import { HandshakeIcon } from '@navikt/aksel-icons';

function FullmektigEllerFullmaktsgiver(props: { fullmakt: Fullmakter }) {
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

function Fullmakt(props: Pick<VergeOgFullmaktData, 'fullmakt'>) {
    const { fullmakt } = props;

    let fullmaktListe;

    if (isNotEmptyArray(fullmakt)) {
        fullmaktListe = fullmakt.map((fullmakt, index) => (
            <FullmektigEllerFullmaktsgiver fullmakt={fullmakt} key={index} />
        ));
    } else {
        return (
            <Informasjonsbolk
                header="Fullmakter"
                headerTypo="ingress"
                icon={<HandshakeIcon title="a11y-title" aria-hidden="true" />}
            >
                {EMDASH}
            </Informasjonsbolk>
        );
    }

    return (
        <Informasjonsbolk
            header="Fullmakter"
            headerTypo="ingress"
            icon={<HandshakeIcon title="a11y-title" aria-hidden="true" />}
        >
            {fullmaktListe}
        </Informasjonsbolk>
    );
}

export default Fullmakt;
