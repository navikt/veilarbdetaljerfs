import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import CvInfo from '../felles/cvinfo';
import { safeMap } from '../../utils';
import { CarIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';

const Forerkort = ({ forerkort }: Pick<ArenaPerson, 'forerkort'>) => {
    const forerkortListe = safeMap(forerkort, (enkeltForerkort, index) => (
        <BodyShort key={`forerkort-${index}`}>
            Klasse {enkeltForerkort?.klasse ? enkeltForerkort?.klasse : EMDASH}
        </BodyShort>
    ));

    return (
        <CvInfo header="Førerkort" icon={<CarIcon />}>
            {forerkortListe}
        </CvInfo>
    );
};

export default Forerkort;
