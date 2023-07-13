import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { safeMap } from '../../utils';
import { CarIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';

const Forerkort = ({ forerkort }: Pick<ArenaPerson, 'forerkort'>) => {
    const forerkortListe = safeMap(forerkort, (enkeltForerkort, index) => (
        <BodyShort size="small" key={`forerkort-${index}`}>
            Klasse {enkeltForerkort?.klasse ? enkeltForerkort?.klasse : EMDASH}
        </BodyShort>
    ));

    return (
        <Informasjonsbolk header="Førerkort" icon={<CarIcon />} headerTypo="ingress">
            {forerkortListe}
        </Informasjonsbolk>
    );
};

export default Forerkort;
