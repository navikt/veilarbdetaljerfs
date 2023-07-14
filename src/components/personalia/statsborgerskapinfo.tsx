import { BodyShort } from '@navikt/ds-react';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formateStringInUpperAndLowerCase} from '../../utils/formater';
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
        <Informasjonsbolk header="Statsborgerskap" headerTypo="ingress">
            {isNotEmptyArray(content) ? content : EMDASH}
        </Informasjonsbolk>
    );
}

export default StatsborgerskapInfo;
