import { BodyShort } from '@navikt/ds-react';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { TilrettelagtKommunikasjonData } from '../../data/api/datatyper/tilrettelagtKommunikasjon';
import EMDASH from '../../utils/emdash';
import { isNullOrUndefined } from '../../utils/felles-typer';

function TilrettelagtKommunikasjon(props: { tilrettelagtKommunikasjon: TilrettelagtKommunikasjonData | undefined }) {
    const { tilrettelagtKommunikasjon } = props;

    if (tilrettelagtKommunikasjon) {
        const { talespraak, tegnspraak } = tilrettelagtKommunikasjon;

        if (!isNullOrUndefined(talespraak))
            return (
                <Informasjonsbolk header="Tilrettelagt kommunikasjon" headerTypo="ingress">
                    <div>
                        {talespraak && <BodyShort size="small">Språktolk: {talespraak}</BodyShort>}
                        {tegnspraak && <BodyShort size="small">Tegnspråktolk</BodyShort>}
                    </div>
                </Informasjonsbolk>
            );
    }
    return (
        <Informasjonsbolk header="Tilrettelagt kommunikasjon" headerTypo="ingress">
            <div>{<BodyShort size="small">Språktolk: {EMDASH}</BodyShort>}</div>
        </Informasjonsbolk>
    );
}

export default TilrettelagtKommunikasjon;
