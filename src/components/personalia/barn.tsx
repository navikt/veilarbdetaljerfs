import { finnAlder } from '../../utils/date-utils';
import { Gradering, PersonaliaInfo, PersonsBarn } from '../../data/api/datatyper/personalia';
import { formateStringInUpperAndLowerCase } from '../../utils/formater';
import { graderingBeskrivelseBarn, hentBorMedBarnBeskrivelse } from '../../utils/konstanter';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import { formaterDato } from '../../utils/formater';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { isNotEmptyArray } from '../../utils/felles-typer';

function BorSammen(props: { barn: PersonsBarn }) {
    const { dodsdato, relasjonsBosted } = props.barn;
    if (dodsdato) {
        return null;
    }

    const borSammen = hentBorMedBarnBeskrivelse(relasjonsBosted);

    return <BodyShort size="small">{borSammen}</BodyShort>;
}

function EnkeltBarn(props: { barn: PersonsBarn }) {
    const { fornavn, fodselsdato, dodsdato, gradering, erEgenAnsatt, harVeilederTilgang } = props.barn;
    const alder = finnAlder(props.barn);
    const graderingTekst = gradering && gradering !== Gradering.UGRADERT ? graderingBeskrivelseBarn(gradering) : null;

    return (
        <div className="underinformasjon">
            {erEgenAnsatt && !harVeilederTilgang ? (
                <div>
                    <BodyShort size="small" className="body_header">
                        <b>{`Barn (${alder})`}</b>
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
                        <b>{`Barn (${alder})`}</b>
                    </BodyShort>
                    <BodyShort size="small">{formateStringInUpperAndLowerCase(fornavn)}</BodyShort>
                    <BodyShort size="small" className="typografi_dato">
                        {formaterDato(fodselsdato)} {dodsdato && `– ${formaterDato(dodsdato)}`}
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
