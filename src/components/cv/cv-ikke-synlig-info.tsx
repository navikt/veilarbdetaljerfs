import { Alert, Link } from '@navikt/ds-react';

export const CvIkkeSynligInfo = () => {
    return (
        <Alert variant="info" size="small" className="panel_infoboks">
            Fra 17.2.2021 kan arbeidsgivere kun se CV til jobbsøkere som ikke er under arbeidsrettet oppfølging fra Nav.
            Les mer om{' '}
            <Link href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Oversikt-over-veileders-tilgang-p%C3%A5-CV-og-jobbprofil.aspx">
                synlig CV
            </Link>
            .
        </Alert>
    );
};
