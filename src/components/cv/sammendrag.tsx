import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import CvInfo from '../felles/cvinfo';
import { BulletListIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';

const Sammendrag = (props: Pick<ArenaPerson, 'sammendrag'>) => {
    return (
        <CvInfo header="Sammendrag" icon={<BulletListIcon />}>
            <BodyShort className="underinformasjon cv-sammendrag">
                {props.sammendrag ? props.sammendrag : EMDASH}
            </BodyShort>
        </CvInfo>
    );
};

export default Sammendrag;
