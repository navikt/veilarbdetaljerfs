import { InfoCard } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { ModiaPersonoversiktTekstMedLenker } from './modia-personoversikt-tekst-og-lenker.tsx';

const Ytelsesinnhold = () => {
    return (
        <InfoCard size="small" data-color="info">
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                <ModiaPersonoversiktTekstMedLenker />
            </InfoCard.Message>
        </InfoCard>
    );
};

export default Ytelsesinnhold;
