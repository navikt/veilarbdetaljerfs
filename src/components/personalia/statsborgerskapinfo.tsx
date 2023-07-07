import { BodyShort } from '@navikt/ds-react';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formateStringInUpperAndLowerCase } from '../../utils/formater';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';

function StatsborgerskapInfo(props: Pick<PersonaliaV2Info, 'statsborgerskap'>) {
    const content = props.statsborgerskap.map((statsborgerskap) => {
        return (
            <BodyShort className="innrykk" key={statsborgerskap}>
                {formateStringInUpperAndLowerCase(statsborgerskap)}
            </BodyShort>
        );
    });

    return <Informasjonsbolk header="Statsborgerskap">{content}</Informasjonsbolk>;
}

export default StatsborgerskapInfo;
