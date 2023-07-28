import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato, formaterVarighet } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { TasklistIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';

const Kurs = ({ kurs }: Pick<ArenaPerson, 'kurs'>) => {
    const sortedKurs = kurs.sort((a, b) => safeSort(b.tidspunkt, a.tidspunkt));
    const mappedKurs = safeMap(sortedKurs, (enkeltKurs, index) => (
        <div key={`kurs-${index}`} className="underinformasjon">
            <BodyShort size="small" className="body_header">
                {enkeltKurs.tittel}
            </BodyShort>

            <BodyShort size="small">{enkeltKurs.arrangor}</BodyShort>
            {enkeltKurs.tidspunkt && (
                <BodyShort size="small" className="typografi_dato">
                    Fullført: {formaterDato(enkeltKurs.tidspunkt)}
                </BodyShort>
            )}
            {enkeltKurs.varighet && (
                <BodyShort size="small" className="typografi_dato">
                    Kurslengde: {formaterVarighet(enkeltKurs.varighet)}
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk
            header="Kurs"
            icon={<TasklistIcon title="Ikon som illustrerer en liste med oppgaver" aria-hidden="true" />}
            headerTypo="ingress"
        >
            {mappedKurs}
        </Informasjonsbolk>
    );
};

export default Kurs;
