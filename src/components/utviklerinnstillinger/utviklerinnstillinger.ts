import { Endepunkt } from '../../data/api/fetch.ts';

export const UTVIKLER_INNSTILLINGER_NOKKEL = 'VEILARBDETALJERFS_UTVIKLER_INNSTILLINGER_NOKKEL';

export const feilkoder = {
    '4XX': [
        400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423,
        424, 425, 426, 428, 429, 431, 451
    ],
    '5XX': [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511]
} as const;
type Feilkode = (typeof feilkoder)['4XX'][number] | (typeof feilkoder)['5XX'][number];
type UtviklerInnstillinger = {
    versjon: number;
    innstillinger: unknown;
};
export type UtviklerInnstillingerSpesifikk = {
    versjon: number;
    innstillinger: {
        simulerEndepunktFeil: {
            endepunktKonfigurasjon: Record<
                Endepunkt,
                {
                    endepunkt: Endepunkt;
                    simulerFeil: boolean;
                    statuskode: Feilkode | null;
                }
            >;
        };
    };
};
export const UTVIKLER_INNSTILLINGER_VERSJON = 2;

export const slettUtviklerinnstillinger = () => localStorage?.removeItem(UTVIKLER_INNSTILLINGER_NOKKEL);
export const hentUtviklerInnstillinger = () => {
    const maybeLagretInnstilling = localStorage?.getItem(UTVIKLER_INNSTILLINGER_NOKKEL);

    if (maybeLagretInnstilling) {
        const innstillingParset = JSON.parse(maybeLagretInnstilling) as UtviklerInnstillinger;
        const lagretInnstillingErUtdatert = innstillingParset.versjon !== UTVIKLER_INNSTILLINGER_VERSJON;

        if (lagretInnstillingErUtdatert) {
            slettUtviklerinnstillinger();
            return null;
        } else {
            return innstillingParset as UtviklerInnstillingerSpesifikk;
        }
    } else {
        return null;
    }
};
export const lagreUtviklerinnstillinger = (verdi: UtviklerInnstillingerSpesifikk) => {
    localStorage?.setItem(UTVIKLER_INNSTILLINGER_NOKKEL, JSON.stringify(verdi));
};
