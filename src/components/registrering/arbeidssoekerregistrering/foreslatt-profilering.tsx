import { BodyShort, Box, Heading, Loader } from '@navikt/ds-react';
import { profilertTilBeskrivelse } from '../../../utils/text-mapper';
import { useGjeldende14aVedtak } from '../../../data/api/fetch';
import { Profilering } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    profilering: Profilering;
    fnr: string;
}

export const ForeslattProfilering = ({ fnr, profilering }: Props) => {
    const {
        data: gjeldende14avedtak,
        error: gjeldende14avedtakError,
        isLoading: gjeldende14avedtakLoading
    } = useGjeldende14aVedtak(fnr);

    if (gjeldende14avedtakLoading) {
        return <Loader size="small" />;
    }

    if (gjeldende14avedtakError || !gjeldende14avedtak) {
        return null;
    }

    return (
        <Box padding="space-16" borderWidth="1" borderRadius="2">
            <Heading level="4" size="small">
                Forslag om brukers muligheter og behov (resultat fra profilering)
            </Heading>
            <BodyShort size="small">{profilertTilBeskrivelse(profilering.profilertTil)}</BodyShort>
        </Box>
    );
};
