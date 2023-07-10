import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import CvInfo from '../felles/cvinfo';
import { BulletListIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';

const Sammendrag = ({ sammendrag }: Pick<ArenaPerson, 'sammendrag'>) => {
    return (
        <CvInfo header="Sammendrag" icon={<BulletListIcon />}>
            <BodyShort className="underinformasjon cv-sammendrag">{sammendrag ? sammendrag : EMDASH}</BodyShort>
        </CvInfo>
    );
};

export default Sammendrag;
