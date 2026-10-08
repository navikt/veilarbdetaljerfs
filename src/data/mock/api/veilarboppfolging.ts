import { UnderOppfolgingData } from '../../api/datatyper/underOppfolgingData';
import { delay, graphql, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS, hentSimulerEndepunktResponsKonfigurasjon } from './index.ts';
import { endepunkter } from '../../api/fetch.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';
import { OppfolgingsData } from '../../api/veilarboppfolgingGraphql.ts';

const veilarboppfolgingGraphql = graphql.link(endepunkter.VEILARBOPPFOLGING_GRAPHQL);

const oppfolging: UnderOppfolgingData = {
    erManuell: true,
    underOppfolging: true
};

const oppfolgingsEnhet: OppfolgingsData = {
    brukerStatus: {
        krr: {
            reservertIKrr: false
        },
        veilederTilordning: {
            veilederIdent: 'A123123'
        }
    },
    oppfolgingsEnhet: {
        enhet: {
            id: '007',
            navn: 'Nav Testheim'
        }
    }
};

export const veilarboppfolgingHandlers: RequestHandler[] = [
    http.post(endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(oppfolging, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),
    veilarboppfolgingGraphql.query('hentOppfolgingsEnhet', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        return HttpResponse.json({
            data: {
                brukerStatus: {
                    krr: {
                        reservertIKrr: true
                    }
                },
                oppfolgingsEnhet: oppfolgingsEnhet
            }
        });
    })
];
