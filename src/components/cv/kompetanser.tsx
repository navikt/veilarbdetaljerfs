import { BodyShort, List } from '@navikt/ds-react';
import { Jobbprofil } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import Informasjonsbolk from '../felles/informasjonsbolk';
import ListItem from '@navikt/ds-react/esm/list/ListItem';
import { ReactComponent as Kompetanserikon } from './ikoner/kompetanser.svg';

const Kompetanser = ({ kompetanse }: Pick<Jobbprofil, 'kompetanse'>) => {
    const kompetanser =
        kompetanse && kompetanse.length > 0
            ? kompetanse?.map((kompetansen, index) => (
                  <ListItem key={index}>
                      <BodyShort size="small">{kompetansen.tittel}</BodyShort>{' '}
                  </ListItem>
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
