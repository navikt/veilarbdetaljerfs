import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { PersonSuitIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';

const Utdanning = ({ utdanning }: Pick<ArenaPerson, 'utdanning'>) => {
    const sortedUtdanning = utdanning.sort((a, b) => safeSort(b.tilDato, a.tilDato));
    const utdanninger = safeMap(sortedUtdanning, (utdanning, index) => (
        <div key={`utdanning-${index}`} className="underinformasjon">
            <BodyShort size="small" className="body_header">
                {utdanning.tittel}
            </BodyShort>

            <BodyShort size="small">{utdanning.studiested}</BodyShort>
            <BodyShort size="small">{utdanning.utdanningsnivaa}</BodyShort>
            <BodyShort size="small" className="typografi_dato">
                Start- og sluttdato: {formaterDato(utdanning.fraDato, true)} -{' '}
                {utdanning.tilDato ? formaterDato(utdanning.tilDato, true) : 'nå'}
            </BodyShort>
            {utdanning.beskrivelse && (
                <BodyShort size="small">
                    Beskrivelse: <em>{utdanning.beskrivelse}</em>
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk
            header="Utdanning"
            icon={<PersonSuitIcon title="a11y-title" aria-hidden="true" />}
            headerTypo="ingress"
        >
            {utdanninger}
        </Informasjonsbolk>
    );
};

export default Utdanning;
