import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { NewspaperIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';

const AnnenErfaring = ({ annenErfaring }: Pick<ArenaPerson, 'annenErfaring'>) => {
    const sortedErfaringer = annenErfaring.sort((a, b) => safeSort(b.tilDato, a.tilDato));
    const erfaringer = safeMap(sortedErfaringer, (erfaring, index) => (
        <div key={`annenerfaring-${index}`} className="underinformasjon">
            <BodyShort size="small" className="body_header">
                {erfaring.rolle}
            </BodyShort>

            <BodyShort size="small">{erfaring.beskrivelse}</BodyShort>
            <BodyShort size="small" className="typografi_dato">
                Start- og sluttdato: {formaterDato(erfaring.fraDato, true)} -{' '}
                {erfaring.tilDato ? formaterDato(erfaring.tilDato, true) : 'nå'}
            </BodyShort>
        </div>
    ));

    return (
        <Informasjonsbolk header="Andre erfaringer" icon={<NewspaperIcon />} headerTypo="ingress">
            {erfaringer}
        </Informasjonsbolk>
    );
};

export default AnnenErfaring;
