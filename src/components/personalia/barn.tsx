import { finnAlderTekstForBarn } from '../../utils/barn-utils.ts';
import { Gradering, PersonaliaInfo, PersonsBarn } from '../../data/api/datatyper/personalia';
import { formateStringInUpperAndLowerCase } from '../../utils/formater';
import { graderingBeskrivelseBarn, hentBorMedBarnBeskrivelse } from '../../utils/konstanter';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import { formaterDato } from '../../utils/formater';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { isNotEmptyArray } from '../../utils/felles-typer';

function BorSammen(props: { barn: PersonsBarn }) {
    const { erDod, relasjonsBosted } = props.barn;
    if (erDod) {
        return null;
    }

    const borSammen = hentBorMedBarnBeskrivelse(relasjonsBosted);

    return <BodyShort size="small">{borSammen}</BodyShort>;
}

function EnkeltBarn(props: { barn: PersonsBarn }) {
    const { fornavn, fodselsdato, alder, erEgenAnsatt, harVeilederTilgang, gradering } = props.barn;
    const adressebeskyttet =
        props.barn.gradering?.includes(Gradering.STRENGT_FORTROLIG) ||
        props.barn.gradering?.includes(Gradering.FORTROLIG) ||
        props.barn.gradering?.includes(Gradering.STRENGT_FORTROLIG_UTLAND);
    const alderTekst = finnAlderTekstForBarn(props.barn);
    const graderingTekst = adressebeskyttet ? graderingBeskrivelseBarn(gradering) : null;

    return (
        <div className="underinformasjon">
            {erEgenAnsatt && !harVeilederTilgang && !adressebeskyttet ? (
                <div>
                    <BodyShort size="small" className="body_header">
                        <b>{`Barn skjermet (${alder})`}</b>
                    </BodyShort>
                    <BorSammen barn={props.barn} />
                </div>
            ) : graderingTekst && !harVeilederTilgang ? (
                <div>
                    <BodyShort size="small" className="body_header">
                        <b>Barn</b>
                    </BodyShort>
                    {graderingTekst && <BodyShort size="small">{graderingTekst}</BodyShort>}
                </div>
            ) : (
                <div>
                    <BodyShort size="small" className="body_header">
                        <b>{`Barn (${alderTekst})`}</b>
                    </BodyShort>
                    <BodyShort size="small">{formateStringInUpperAndLowerCase(fornavn)}</BodyShort>
                    <BodyShort size="small" className="typografi_dato">
                        {formaterDato(fodselsdato)}
                    </BodyShort>
                    <BorSammen barn={props.barn} />
                    {graderingTekst && <BodyShort size="small">{graderingTekst}</BodyShort>}
                </div>
            )}
        </div>
    );
}

function Barn(props: Pick<PersonaliaInfo, 'barn'>) {
    const { barn } = props;

    const barnListe = isNotEmptyArray(barn)
        ? barn.map((ettBarn, index) => <EnkeltBarn barn={ettBarn} key={index} />)
        : EMDASH;

    return (
        <Informasjonsbolk header="Barn under 21 år" headerTypo="ingress">
            {barnListe}
        </Informasjonsbolk>
    );
}

export default Barn;
