import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { BulletListIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';

const Sammendrag = ({ sammendrag }: Pick<ArenaPerson, 'sammendrag'>) => {
    return (
        <Informasjonsbolk
            header="Sammendrag"
            icon={<BulletListIcon title="a11y-title" aria-hidden="true" />}
            headerTypo="ingress"
        >
            <BodyShort className="underinformasjon">{sammendrag ? sammendrag : EMDASH}</BodyShort>
        </Informasjonsbolk>
    );
};

export default Sammendrag;
