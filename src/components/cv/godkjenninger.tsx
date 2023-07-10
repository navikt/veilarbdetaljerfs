import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import CvInfo from '../felles/cvinfo';
import { formaterDato } from '../../utils/formater';
import { safeMap } from '../../utils';
import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';

const Godkjenninger = (props: Pick<ArenaPerson, 'godkjenninger'>) => {
    const { godkjenninger } = props;
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
        <CvInfo header="Offentlige godkjenninger" icon={<SealCheckmarkIcon />}>
            {godkjenningListe}
        </CvInfo>
    );
};

export default Godkjenninger;
