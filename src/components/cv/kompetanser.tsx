import { Jobbprofil } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import CvInfo from '../felles/cvinfo';
import { FolderFileIcon } from '@navikt/aksel-icons';

const Kompetanser = ({ kompetanse }: Pick<Jobbprofil, 'kompetanse'>) => {
    const kompetanser =
        kompetanse && kompetanse.length > 0 ? kompetanse?.map((kompetansen) => <li>{kompetansen.tittel}</li>) : EMDASH;

    return (
        <CvInfo header="Kompetanser" icon={<FolderFileIcon />}>
            <ul>{kompetanser}</ul>
        </CvInfo>
    );
};

export default Kompetanser;
