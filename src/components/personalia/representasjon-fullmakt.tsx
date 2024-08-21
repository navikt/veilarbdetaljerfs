import { BodyShort } from '@navikt/ds-react';
import { Fullmakt } from '../../data/api/datatyper/fullmakt.ts';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import EMDASH from '../../utils/emdash';
import { isNotEmptyArray } from '../../utils/felles-typer';
import { useFullmakt } from '../../data/api/fetch.ts';
import { useAppStore } from '../../stores/app-store.ts';

function FullmektigEllerFullmaktsgiver(props: { fullmakt: Fullmakt }) {
    const { fullmaktsgiver, fullmaktsgiverNavn, fullmektig, fullmektigsNavn, omraade, gyldigFraOgMed, gyldigTilOgMed } =
        props.fullmakt;

    const handlingsType = omraade
        .filter((omraade) => omraade.tema === 'Oppfølging')
        .map((OmraadeHandlingType) => {
            return OmraadeHandlingType.handling.join(', ');
        })
        .join(', ');

    return (
        <div className="info-for-en-fullmakt">
            <div className="underinformasjon">
                <BodyShort size="small" className="body_header">
                    <b>Fullmaktsgiver:</b> {fullmaktsgiver}
                </BodyShort>
                <BodyShort size="small">{fullmaktsgiverNavn}</BodyShort>
            </div>
            <div className="underinformasjon">
                <BodyShort size="small" className="body_header">
                    <b>Fullmektig:</b> {fullmektig}
                </BodyShort>
                <BodyShort size="small">{fullmektigsNavn}</BodyShort>
            </div>
            <div className="underinformasjon">
                <BodyShort size="small" className="body_header">
                    <b>Område:</b> Oppfølging
                </BodyShort>
                <BodyShort size="small">Handlingstype(r): {handlingsType.toLowerCase()}</BodyShort>
                <BodyShort size="small" className="typografi_dato">
                    Gyldig fra og med: {formaterDato(gyldigFraOgMed)}
                </BodyShort>
                <BodyShort size="small" className="typografi_dato">
                    Gyldig til og med: {formaterDato(gyldigTilOgMed)}
                </BodyShort>
            </div>
        </div>
    );
}

const FullmaktListe = () => {
    const { fnr } = useAppStore();
    const fullmaktData = useFullmakt(fnr!).data;
    const harFullmaktData = fullmaktData !== undefined && isNotEmptyArray(fullmaktData.fullmakt);
    const fullmaktMedOppfolging = fullmaktData?.fullmakt?.filter((fullmakt) =>
        fullmakt.omraade.some((omraade) => omraade.tema === 'Oppfølging')
    );

    return (
        <Informasjonsbolk header="Fullmakter" headerTypo="ingress">
            {harFullmaktData && fullmaktMedOppfolging?.length ? (
                fullmaktMedOppfolging?.map((fullmakt, index) => (
                    <FullmektigEllerFullmaktsgiver fullmakt={fullmakt} key={index} />
                ))
            ) : (
                <>{EMDASH}</>
            )}
        </Informasjonsbolk>
    );
};

export default FullmaktListe;
