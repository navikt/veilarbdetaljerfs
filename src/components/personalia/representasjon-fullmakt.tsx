import { BodyShort } from '@navikt/ds-react';
import { Fullmakt } from '../../data/api/datatyper/fullmakt.ts';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formateStringInUpperAndLowerCase, formaterDato } from '../../utils/formater';
import EMDASH from '../../utils/emdash';
import { isNotEmptyArray } from '../../utils/felles-typer';
import { useFullmakt } from '../../data/api/fetch.ts';
import { useAppStore } from '../../stores/app-store.ts';

function FullmektigEllerFullmaktsgiver(props: { fullmakt: Fullmakt }) {
    const { fullmaktsgiver, fullmaktsgiverNavn,
        fullmektig, fullmektigsNavn,
        omraade,
        gyldigFraOgMed, gyldigTilOgMed } =
        props.fullmakt;

   const gjeldendeOmraader = omraade.map((omraade) => omraade.tema).join(', ');

    return (
        <div className="underinformasjon">
            <BodyShort size="small" className="body_header">
                <b>
                    {formateStringInUpperAndLowerCase('Fullmaktsgiver')}: {fullmaktsgiver}
                </b>
            </BodyShort>
            <BodyShort size="small">Fullmaktsgivernavn: {fullmaktsgiverNavn}</BodyShort>
            <BodyShort size="small" className="body_header">
                <b>
                    {formateStringInUpperAndLowerCase('Fullmektig')}: {fullmektig}
                </b>
            </BodyShort>
            <BodyShort size="small">Fullmektigsnavn: {fullmektigsNavn}</BodyShort>
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

const RepresentasjonFullmaktsgiver = () => {
    const { fnr } = useAppStore();
    const fullmakt = useFullmakt(fnr!).data;
    console.log("fullmakt:", fullmakt);
    const Fullmaktinnhold = () => {
        if (fullmakt !== undefined && isNotEmptyArray(fullmakt)) {
                return fullmakt.map((fullmakt, index) => (
                <FullmektigEllerFullmaktsgiver fullmakt={fullmakt} key={index} />
            ));
        } else {
            return <>{EMDASH}</>;
        }
    };

    return (
        <Informasjonsbolk header="Representajon Fullmakter" headerTypo="ingress">
            <Fullmaktinnhold />
        </Informasjonsbolk>
    );
}

export default RepresentasjonFullmaktsgiver;
