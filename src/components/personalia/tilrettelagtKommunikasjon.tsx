import { BodyShort } from '@navikt/ds-react';
import { TilrettelagtKommunikasjonData } from '../../data/api/datatyper/tilrettelagtKommunikasjon';
import EMDASH from '../../utils/emdash';
import { isNullOrUndefined } from '../../utils/felles-typer';

function TilrettelagtKommunikasjon(props: { tilrettelagtKommunikasjon: TilrettelagtKommunikasjonData | undefined }) {
    const { tilrettelagtKommunikasjon } = props;

    if (tilrettelagtKommunikasjon) {
        const { talespraak, tegnspraak } = tilrettelagtKommunikasjon;

        if (!isNullOrUndefined(talespraak && tegnspraak))
            return (
                <div className="underinformasjon">
                    <BodyShort size="small" className="BodyHeader">
                        Tilrettelagt Kommunikasjon
                    </BodyShort>
                    {talespraak && <BodyShort size="small">Språktolk: {talespraak}</BodyShort>}
                    {tegnspraak && <BodyShort size="small">Tegnspråktolk: {tegnspraak}</BodyShort>}
                </div>
            );
        if (!isNullOrUndefined(talespraak))
            return (
                <div className="underinformasjon">
                    <BodyShort size="small" className="BodyHeader">
                        Tilrettelagt Kommunikasjon
                    </BodyShort>
                    {talespraak && <BodyShort size="small">Språktolk: {talespraak}</BodyShort>}
                </div>
            );
        if (!isNullOrUndefined(tegnspraak))
            return (
                <div className="underinformasjon">
                    <BodyShort size="small" className="BodyHeader">
                        Tilrettelagt Kommunikasjon
                    </BodyShort>
                    {tegnspraak && <BodyShort size="small">Tegnspråktolk: {tegnspraak}</BodyShort>}
                </div>
            );
    }
    return (
        <div className="underinformasjon">
            <BodyShort size="small" className="BodyHeader">
                Tilrettelagt Kommunikasjon
            </BodyShort>
            {<BodyShort size="small">{EMDASH}</BodyShort>}
        </div>
    );
}

export default TilrettelagtKommunikasjon;
