import { BodyShort } from '@navikt/ds-react';
import { Fullmakt } from '../../data/api/datatyper/fullmakt.ts';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formateStringInUpperAndLowerCase, formaterDato } from '../../utils/formater';
import EMDASH from '../../utils/emdash';
import { isNotEmptyArray } from '../../utils/felles-typer';
import { useFullmakt } from '../../data/api/fetch.ts';
import { useAppStore } from '../../stores/app-store.ts';

function FullmektigEllerFullmaktsgiver(props: { fullmakt: Fullmakt }) {
    const { fullmaktsgiver, fullmaktsgiverNavn, fullmektig, fullmektigsNavn, omraade, gyldigFraOgMed, gyldigTilOgMed } =
        props.fullmakt;

    const gjeldendeOmraader = omraade.map((omraade) => omraade.tema).join(', ');
    const handlingsType = omraade
        .map((OmraadeHandlingType) => {
            return OmraadeHandlingType.handling;
        })
        .join(',');

    if (gjeldendeOmraader.includes('Oppfølging')) {
        return (
            <div className="underinformasjon">
                <BodyShort size="small" spacing>
                    <BodyShort size="small" className="body_header">
                        <b>Fullmaktsgiver:</b> {fullmaktsgiver}
                    </BodyShort>
                    <BodyShort size="small">{formateStringInUpperAndLowerCase(fullmaktsgiverNavn)}</BodyShort>
                </BodyShort>
                <BodyShort size="small" spacing>
                    <BodyShort size="small" className="body_header">
                        <b>Fullmektig:</b> {fullmektig}
                    </BodyShort>
                    <BodyShort size="small">{formateStringInUpperAndLowerCase(fullmektigsNavn)}</BodyShort>
                </BodyShort>
                <BodyShort size="small" spacing>
                    <BodyShort size="small" className="body_header">
                        <b>Område:</b> {gjeldendeOmraader}
                    </BodyShort>
                    <BodyShort size="small">Handling type: {handlingsType.toLowerCase()}</BodyShort>
                    <BodyShort size="small" className="typografi_dato">
                        Gyldig fra og med: {formaterDato(gyldigFraOgMed)}
                    </BodyShort>
                    <BodyShort size="small" className="typografi_dato">
                        Gyldig til og med: {formaterDato(gyldigTilOgMed)}
                    </BodyShort>
                </BodyShort>
            </div>
        );
    } else {
        return <>{EMDASH}</>;
    }
}

const FullmaktListe = () => {
    const { fnr } = useAppStore();
    const fullmaktData = useFullmakt(fnr!).data;
    const Fullmaktinnhold = () => {
        if (fullmaktData !== undefined && isNotEmptyArray(fullmaktData.fullmakt)) {
            return fullmaktData.fullmakt.map((fullmakt, index) => (
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
};

export default FullmaktListe;
