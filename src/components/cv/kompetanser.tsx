import { BodyShort, List } from '@navikt/ds-react';
import { Jobbprofil } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import Informasjonsbolk from '../felles/informasjonsbolk';
import Kompetanserikon from './ikoner/kompetanser.svg?react';

const Kompetanser = ({ kompetanse }: Pick<Jobbprofil, 'kompetanse'>) => {
    const kompetanser =
        kompetanse && kompetanse.length > 0
            ? kompetanse?.map((kompetansen, index) => (
                  <List.Item key={index}>
                      <BodyShort size="small">{kompetansen.tittel}</BodyShort>{' '}
                  </List.Item>
              ))
            : EMDASH;

    return (
        <Informasjonsbolk header="Kompetanser" icon={<Kompetanserikon aria-hidden="true" />} headerTypo="ingress">
            <List as="ul" size="small">
                {kompetanser}
            </List>
        </Informasjonsbolk>
    );
};

export default Kompetanser;
