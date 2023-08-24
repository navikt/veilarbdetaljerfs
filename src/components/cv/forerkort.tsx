import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { safeMap } from '../../utils';
import { BodyShort } from '@navikt/ds-react';
import {ReactComponent as Forerkortikon } from './ikoner/forerkort.svg';
import EMDASH from '../../utils/emdash';

const Forerkort = ({ forerkort }: Pick<ArenaPerson, 'forerkort'>) => {
    const forerkortListe = safeMap(forerkort, (enkeltForerkort, index) => (
        <BodyShort size="small" key={`forerkort-${index}`}>
            Klasse {enkeltForerkort?.klasse ? enkeltForerkort?.klasse : EMDASH}
        </BodyShort>
    ));

    return (
        <Informasjonsbolk
            header="Førerkort"
            icon={<Forerkortikon aria-hidden="true" />}
            headerTypo="ingress"
        >
            {forerkortListe}
        </Informasjonsbolk>
    );
};

export default Forerkort;
