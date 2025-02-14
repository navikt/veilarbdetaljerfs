import { BodyShort, Box, Heading, Loader } from '@navikt/ds-react';
import { profilertTilBeskrivelse } from '../../../utils/text-mapper';
import {
    GjeldendeOppfolgingsperiode,
    Siste14aVedtak,
    useGjeldendeOppfolgingsperiode,
    useSiste14aVedtak
} from '../../../data/api/fetch';
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
    const {
        data: gjeldendeOppfolgingsperiode,
        error: gjeldendeOppfolgingsperiodeError,
        isLoading: gjeldendeOppfolgingsperiodeLoading
    } = useGjeldendeOppfolgingsperiode(fnr);

    if (siste14avedtakLoading || gjeldendeOppfolgingsperiodeLoading) {
        return <Loader size="small" />;
    }

    const detErFattetVedtakIDenneOppfolgingsperioden = (
        gjeldendeOppfolgingsperiode?: GjeldendeOppfolgingsperiode,
        siste14avedtak?: Siste14aVedtak
    ) => {
        if (!siste14avedtak) {
            return false;
        }
        const periodeStartetdato = gjeldendeOppfolgingsperiode?.startDato
            ? Date.parse(gjeldendeOppfolgingsperiode.startDato)
            : null;
        const vedtakFattetDato = siste14avedtak?.fattetDato ? Date.parse(siste14avedtak.fattetDato) : null;

        return periodeStartetdato && vedtakFattetDato && vedtakFattetDato > periodeStartetdato;
    };

    if (
        siste14avedtakError ||
        gjeldendeOppfolgingsperiodeError ||
        detErFattetVedtakIDenneOppfolgingsperioden(gjeldendeOppfolgingsperiode, siste14avedtak)
    ) {
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
