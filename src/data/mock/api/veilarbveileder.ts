import { RequestHandler } from 'msw';
import { http, HttpResponse } from 'msw/http';
import { delay } from 'msw/utils/delay';
import { VeilederData } from '../../api/datatyper/veileder';
import { DEFAULT_DELAY_MILLISECONDS, hentSimulerEndepunktResponsKonfigurasjon } from './index.ts';
import { endepunkter, overblikkVisningRequest, overblikkVisningResponse } from '../../api/fetch.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';
import { Collection } from '@msw/data';
import { persist } from '@msw/data/extensions/persist';
import { sync } from '@msw/data/extensions/sync';

const veileder: VeilederData = {
    etternavn: 'Veiledersen',
    fornavn: 'Iskrem',
    ident: 'Z123999',
    navn: 'Iskrem Veiledersen'
};

const chips: overblikkVisningResponse = {
    overblikkVisning: ['CV', 'Jobbønsker', 'Registrering', 'Oppfølging', 'Ytelser (Arena)', 'Personalia']
};

type LagredeInformasjonsbokser = { value: string[] };

const lagredeInformasjonsbokser = new Collection({
    schema: {
        '~standard': {
            version: 1,
            vendor: 'veilarbdetaljerfs',
            types: {
                input: {} as LagredeInformasjonsbokser,
                output: {} as LagredeInformasjonsbokser
            },
            validate(value: unknown) {
                if (
                    typeof value === 'object' &&
                    value !== null &&
                    'value' in value &&
                    Array.isArray(value.value) &&
                    value.value.every((item) => typeof item === 'string')
                ) {
                    return { value: value as LagredeInformasjonsbokser };
                }

                return {
                    issues: [{ message: 'Forventet overblikkvisningsdata med en liste over informasjonsbokser.' }]
                };
            }
        }
    },
    extensions: [sync(), persist()]
});

if (!lagredeInformasjonsbokser.findFirst()) {
    await lagredeInformasjonsbokser.create({ value: chips.overblikkVisning });
}

export const veilarbveilederHandlers: RequestHandler[] = [
    http.get(`${endepunkter.VEILARBVEILEDER_VEILEDER}:veilederId`, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBVEILEDER_VEILEDER
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(veileder, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),
    http.get(endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING, async () => {
        const data = lagredeInformasjonsbokser.findFirst()!.value;
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(
            { overblikkVisning: data },
            {
                headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
            }
        );
    }),

    http.post(endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING, async ({ request }) => {
        const requestBody = (await request.json()) as overblikkVisningRequest;
        await lagredeInformasjonsbokser.update(lagredeInformasjonsbokser.findFirst()!, {
            data(record) {
                record.value = requestBody.overblikkVisning;
            }
        });
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return new HttpResponse(null, {
            status: 204,
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    })
];
