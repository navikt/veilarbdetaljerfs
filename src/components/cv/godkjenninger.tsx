import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap } from '../../utils';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import OffentligeGodkjenningerikon from './ikoner/offentlige-godkjenninger.svg?react';

const Godkjenninger = ({ godkjenninger }: Pick<ArenaPerson, 'godkjenninger'>) => {
    const godkjenningListe = safeMap(godkjenninger, (godkjenning, index) => (
        <div key={`godkjenninger-${index}`} className="underinformasjon">
            <BodyShort size="small" className="body_header" key={`godkjenninger-${index}`}>
                {godkjenning.tittel}
            </BodyShort>

            <BodyShort size="small">Utsteder: {godkjenning.utsteder ? godkjenning.utsteder : EMDASH}</BodyShort>
            <BodyShort size="small" className="typografi_dato">
                Fullført: {formaterDato(godkjenning.gjennomfortDato)}
            </BodyShort>
            {godkjenning.utloperDato && (
                <BodyShort size="small" className="typografi_dato">
                    Utløper: {godkjenning.utloperDato ? formaterDato(godkjenning.utloperDato) : EMDASH}
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk
            header="Offentlige godkjenninger"
            icon={<OffentligeGodkjenningerikon aria-hidden="true" />}
            headerTypo="ingress"
        >
            {godkjenningListe}
        </Informasjonsbolk>
    );
};

export default Godkjenninger;
