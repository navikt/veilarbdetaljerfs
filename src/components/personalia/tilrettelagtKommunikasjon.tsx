import { BodyShort } from '@navikt/ds-react';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { TilrettelagtKommunikasjonData } from '../../data/api/datatyper/tilrettelagtKommunikasjon';
import EMDASH from '../../utils/emdash';
import { isNullOrUndefined } from '../../utils/felles-typer';

function TilrettelagtKommunikasjon(props: { tilrettelagtKommunikasjon: TilrettelagtKommunikasjonData | null }) {
    const { tilrettelagtKommunikasjon } = props;

    if (tilrettelagtKommunikasjon) {
        const { talespraak, tegnspraak } = tilrettelagtKommunikasjon;

        if (!isNullOrUndefined(talespraak))
            return (
                <Informasjonsbolk header="Tilrettelagt kommunikasjon">
                    <div className="innrykk">
                        {talespraak && <BodyShort>Språktolk: {talespraak}</BodyShort>}
                        {tegnspraak && <BodyShort>Tegnspråktolk</BodyShort>}
                    </div>
                </Informasjonsbolk>
            );
    }
    return (
        <Informasjonsbolk header="Tilrettelagt kommunikasjon">
            <div className="innrykk">{<BodyShort>{EMDASH}</BodyShort>}</div>
        </Informasjonsbolk>
    );
}

export default TilrettelagtKommunikasjon;
