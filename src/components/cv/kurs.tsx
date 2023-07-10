import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import CvInfo from '../felles/cvinfo';
import { formaterDato, formaterVarighet } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { TasklistIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';

const Kurs = ({ kurs }: Pick<ArenaPerson, 'kurs'>) => {
    const sortedKurs = kurs.sort((a, b) => safeSort(b.tidspunkt, a.tidspunkt));
    const mappedKurs = safeMap(sortedKurs, (enkeltKurs, index) => (
        <div key={`kurs-${index}`} className="underinformasjon">
            <Label size="small" as="p">
                {enkeltKurs.tittel}
            </Label>

            <BodyShort>{enkeltKurs.arrangor}</BodyShort>
            {enkeltKurs.tidspunkt && <BodyShort>Fullført: {formaterDato(enkeltKurs.tidspunkt)}</BodyShort>}
            {enkeltKurs.varighet && <BodyShort>Kurslengde: {formaterVarighet(enkeltKurs.varighet)}</BodyShort>}
        </div>
    ));

    return (
        <CvInfo header="Kurs" icon={<TasklistIcon />}>
            {mappedKurs}
        </CvInfo>
    );
};

export default Kurs;
