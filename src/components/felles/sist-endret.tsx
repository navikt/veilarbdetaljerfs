import { StringOrNothing } from '../../utils/felles-typer';
import { formaterDato } from '../../utils/formater';
import { BodyShort } from '@navikt/ds-react';

interface SistEndretProps {
    sistEndret: StringOrNothing;
    onlyYearAndMonth: boolean;
}

function SistEndret(props: SistEndretProps) {
    const formattertTidspunkt = formaterDato(props.sistEndret, props.onlyYearAndMonth);

    return <BodyShort size="small">{`Sist endret: ${formattertTidspunkt}`}</BodyShort>;
}

export default SistEndret;
