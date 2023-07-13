import { BodyShort } from '@navikt/ds-react';
import { Jobbprofil } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { FolderFileIcon } from '@navikt/aksel-icons';

const Kompetanser = ({ kompetanse }: Pick<Jobbprofil, 'kompetanse'>) => {
    const kompetanser =
        kompetanse && kompetanse.length > 0 ? kompetanse?.map((kompetansen) => <li>{kompetansen.tittel}</li>) : EMDASH;

    return (
        <Informasjonsbolk header="Kompetanser" icon={<FolderFileIcon />} headerTypo="ingress">
            <ul>
                <BodyShort>{kompetanser}</BodyShort>
            </ul>
        </Informasjonsbolk>
    );
};

export default Kompetanser;
