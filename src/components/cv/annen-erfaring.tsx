import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import CvInfo from '../felles/cvinfo';
import { formaterDato } from '../../utils/formater';
import { safeMap, safeSort } from '../../utils';
import { NewspaperIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';

const AnnenErfaring = (props: Pick<ArenaPerson, 'annenErfaring'>) => {
    const { annenErfaring: arenaErfaring } = props;
    const sortedErfaringer = arenaErfaring.sort((a, b) => safeSort(b.tilDato, a.tilDato));
    const erfaringer = safeMap(sortedErfaringer, (erfaring, index) => (
        <div key={`annenerfaring-${index}`} className="underinformasjon">
            <Label size="small" as="p">
                {erfaring.rolle}
            </Label>

            <BodyShort>{erfaring.beskrivelse}</BodyShort>
            <BodyShort>
                Start- og sluttdato: {formaterDato(erfaring.fraDato, true)} -{' '}
                {erfaring.tilDato ? formaterDato(erfaring.tilDato, true) : 'nå'}
            </BodyShort>
        </div>
    ));

    return (
        <CvInfo header="Andre erfaringer" icon={<NewspaperIcon />}>
            {erfaringer}
        </CvInfo>
    );
};

export default AnnenErfaring;
