import { BodyShort } from '@navikt/ds-react';
import { formateStringInUpperAndLowerCase } from '../../utils/formater';
import EMDASH from '../../utils/emdash';
import { isNotEmptyArray } from '../../utils/felles-typer';

function StatsborgerskapInfo(props: { statsborgerskapData: string[] }) {
    const content = props.statsborgerskapData.map((statsborgerskap) => {
        return (
            <BodyShort size="small" key={statsborgerskap}>
                {formateStringInUpperAndLowerCase(statsborgerskap)}
            </BodyShort>
        );
    });

    return (
        <div className="underinformasjon">
            <BodyShort size="small" className="BodyHeader">
                Statsborgerskap
            </BodyShort>
            {isNotEmptyArray(content) ? content : EMDASH}
        </div>
    );
}

export default StatsborgerskapInfo;
