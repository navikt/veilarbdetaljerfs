import { InfoCard } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { ModiaPersonoversiktTekstMedLenker } from './modia-personoversikt-tekst-og-lenker.tsx';

const Ytelsesinnhold = () => {
    return (
        <InfoCard data-color="info">
            <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                <ModiaPersonoversiktTekstMedLenker />
            </InfoCard.Header>
        </InfoCard>
    );
};

export default Ytelsesinnhold;
