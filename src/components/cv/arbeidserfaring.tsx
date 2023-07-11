import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { BodyShort, Label } from '@navikt/ds-react';
import { Buldings3Icon } from '@navikt/aksel-icons';

const Arbeidserfaring = ({ arbeidserfaring }: Pick<ArenaPerson, 'arbeidserfaring'>) => {
    const sortedErfaringer = arbeidserfaring.sort((a, b) => safeSort(b.tilDato, a.tilDato));
    const erfaringer = safeMap(sortedErfaringer, (erfaring, index) => (
        <div key={`arbeidserfaring-${index}`} className="underinformasjon">
            <Label size="small" as="p">
                {erfaring.tittel}
            </Label>

            <BodyShort>{erfaring.arbeidsgiver}</BodyShort>
            <BodyShort>Sted: {erfaring.sted}</BodyShort>
            <BodyShort>
                Start- og sluttdato: {formaterDato(erfaring.fraDato, true)} -{' '}
                {erfaring.tilDato ? formaterDato(erfaring.tilDato, true) : 'nå'}
            </BodyShort>
            {erfaring.beskrivelse && (
                <BodyShort>
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
