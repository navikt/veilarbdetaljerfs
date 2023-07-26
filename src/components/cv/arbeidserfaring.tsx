import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { BodyShort } from '@navikt/ds-react';
import { Buldings3Icon } from '@navikt/aksel-icons';

const Arbeidserfaring = ({ arbeidserfaring }: Pick<ArenaPerson, 'arbeidserfaring'>) => {
    const sortedErfaringer = arbeidserfaring.sort((a, b) => safeSort(b.tilDato, a.tilDato));
    const erfaringer = safeMap(sortedErfaringer, (erfaring, index) => (
        <div key={`arbeidserfaring-${index}`} className="underinformasjon">
            <BodyShort size="small" className="body_header">
                {erfaring.tittel}
            </BodyShort>

            <BodyShort size="small">{erfaring.arbeidsgiver}</BodyShort>
            <BodyShort size="small">Sted: {erfaring.sted}</BodyShort>
            <BodyShort size="small" className="typografi_dato">
                Start- og sluttdato: {formaterDato(erfaring.fraDato, true)} -{' '}
                {erfaring.tilDato ? formaterDato(erfaring.tilDato, true) : 'nå'}
            </BodyShort>
            {erfaring.beskrivelse && (
                <BodyShort size="small">
                    Arbeidsoppgaver: <em>{erfaring.beskrivelse}</em>
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk header="Arbeidsforhold" icon={<Buldings3Icon />} headerTypo="ingress">
            {erfaringer}
        </Informasjonsbolk>
    );
};

export default Arbeidserfaring;
