import { BodyShort } from '@navikt/ds-react';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formateStringInUpperAndLowerCase } from '../../utils/formater';

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
            {content}
        </Informasjonsbolk>
    );
}

export default StatsborgerskapInfo;
