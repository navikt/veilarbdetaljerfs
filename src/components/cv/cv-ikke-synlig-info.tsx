import { Alert, BodyShort, Link } from '@navikt/ds-react';

export const CvIkkeSynligInfo = () => {
    return (
        <Alert variant="info" className="cv_ikke_synlig">
            <BodyShort size="small">
                Fra 17.2.2021 kan arbeidsgivere kun se CV til jobbsøkere som ikke er under arbeidsrettet oppfølging fra
                NAV. Les mer om{' '}
                <Link href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Oversikt-over-veileders-tilgang-p%C3%A5-CV-og-jobbprofil.aspx">
                    synlig CV
                </Link>
                .
            </BodyShort>
        </Alert>
    );
};
