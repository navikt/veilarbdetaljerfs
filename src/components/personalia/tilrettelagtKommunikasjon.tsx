import { BodyShort } from '@navikt/ds-react';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { isNullOrUndefined } from '../../utils/felles-typer';
import { TilrettelagtKommunikasjonData } from '../../data/api/datatyper/tilrettelagtKommunikasjon';

function TilrettelagtKommunikasjon(props: { tilrettelagtKommunikasjon: TilrettelagtKommunikasjonData }) {
    const { tilrettelagtKommunikasjon, ...rest } = props;
    const { talespraak, tegnspraak } = tilrettelagtKommunikasjon;

    if (isNullOrUndefined(talespraak) && isNullOrUndefined(tegnspraak)) {
        return null;
    }

    return (
        <Informasjonsbolk header="Tilrettelagt kommunikasjon" {...rest}>
            <div className="innrykk">
                {talespraak && <BodyShort>Språktolk: {talespraak}</BodyShort>}
                {tegnspraak && <BodyShort>Tegnspråktolk</BodyShort>}
            </div>
        </Informasjonsbolk>
    );
}

export default TilrettelagtKommunikasjon;
