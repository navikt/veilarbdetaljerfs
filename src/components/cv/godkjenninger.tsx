import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap } from '../../utils';
import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';

const Godkjenninger = ({ godkjenninger }: Pick<ArenaPerson, 'godkjenninger'>) => {
    const godkjenningListe = safeMap(godkjenninger, (godkjenning, index) => (
        <div key={`godkjenninger-${index}`} className="underinformasjon">
            <Label size="small" as="p" key={`godkjenninger-${index}`}>
                {godkjenning.tittel}
            </Label>

            <BodyShort>Utsteder: {godkjenning.utsteder ? godkjenning.utsteder : EMDASH}</BodyShort>
            <BodyShort>Fullført: {formaterDato(godkjenning.gjennomfortDato)}</BodyShort>
            {godkjenning.utloperDato && (
                <BodyShort>
                    Utløper: {godkjenning.utloperDato ? formaterDato(godkjenning.utloperDato) : EMDASH}
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk header="Offentlige godkjenninger" icon={<SealCheckmarkIcon />} headerTypo="ingress">
            {godkjenningListe}
        </Informasjonsbolk>
    );
};

export default Godkjenninger;
