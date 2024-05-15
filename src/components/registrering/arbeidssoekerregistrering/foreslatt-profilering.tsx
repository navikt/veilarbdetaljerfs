import { BodyShort, Box, Heading, Loader } from '@navikt/ds-react';
import { profilertTilBeskrivelse } from '../../../utils/text-mapper.ts';
import { useSiste14aVedtak } from '../../../data/api/fetch.ts';
import { Profilering } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    profilering: Profilering;
    fnr: string;
}

export const ForeslattProfilering = ({ fnr, profilering }: Props) => {
    const {
        data: siste14avedtak,
        error: siste14avedtakError,
        isLoading: siste14avedtakLoading
    } = useSiste14aVedtak(fnr);

    if (siste14avedtakLoading) {
        return <Loader size="small" />;
    }

    if (siste14avedtakError || siste14avedtak == null) {
        return null;
    }

    return (
        <Box padding="4" borderWidth="1" borderRadius="small">
            <Heading level="4" size="small">
                Forslag om brukers muligheter og behov (resultat fra profilering)
            </Heading>
            <BodyShort size="small">{profilertTilBeskrivelse(profilering.profilertTil)}</BodyShort>
        </Box>
    );
};
