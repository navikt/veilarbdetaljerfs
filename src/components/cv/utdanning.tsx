import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import CvInfo from '../felles/cvinfo';
import { formaterDato } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { PersonSuitIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';

const Utdanning = (props: Pick<ArenaPerson, 'utdanning'>) => {
    const { utdanning: arenaUtdanning } = props;
    const sortedUtdanning = arenaUtdanning.sort((a, b) => safeSort(b.tilDato, a.tilDato));
    const utdanninger = safeMap(sortedUtdanning, (utdanning, index) => (
        <div key={`utdanning-${index}`} className="underinformasjon">
            <Label size="small" as="p">
                {utdanning.tittel}
            </Label>

            <BodyShort>{utdanning.studiested}</BodyShort>
            <BodyShort>{utdanning.utdanningsnivaa}</BodyShort>
            <BodyShort>
                Start- og sluttdato: {formaterDato(utdanning.fraDato, true)} -{' '}
                {utdanning.tilDato ? formaterDato(utdanning.tilDato, true) : 'nå'}
            </BodyShort>
            {utdanning.beskrivelse && (
                <BodyShort>
                    Beskrivelse: <em>{utdanning.beskrivelse}</em>
                </BodyShort>
            )}
        </div>
    ));

    return (
        <CvInfo header="Utdanning" icon={<PersonSuitIcon />}>
            {utdanninger}
        </CvInfo>
    );
};

export default Utdanning;
