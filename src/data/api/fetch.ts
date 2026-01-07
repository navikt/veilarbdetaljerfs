import { createPOSToptions, customResponseHeaders, GEToptions } from './datatyper/apiOptions';
import { OppfolgingsstatusData } from './datatyper/oppfolgingsstatus';
import { PersonaliaInfo } from './datatyper/personalia';
import { TilrettelagtKommunikasjonData } from './datatyper/tilrettelagtKommunikasjon';
import { StringOrNothing } from '../../utils/felles-typer';
import { VeilederData } from './datatyper/veileder';
import { YtelseData } from './datatyper/ytelse';
import { Vergemal } from './datatyper/verge';
import { ArenaPerson } from './datatyper/arenaperson';
import { UnderOppfolgingData } from './datatyper/underOppfolgingData';
import { AktorId } from './datatyper/aktor-id';
import { FrontendEvent } from '../../utils/logger';
import useSWR from 'swr';
import { OpplysningerOmArbeidssoker, Profilering } from '@navikt/arbeidssokerregisteret-utils';
import { FullmaktData } from './datatyper/fullmakt.ts';
import { OppfolgingData } from './datatyper/oppfolging.ts';
import { Kodeverk14a } from './datatyper/kodeverk14aData.ts';

export interface ErrorMessage {
    error: Error | unknown;
    status?: number | null;
    info: StringOrNothing;
    korrelasjonId: string | null;
}

export interface overblikkVisningRequest {
    overblikkVisning: string[];
}

export interface overblikkVisningResponse {
    overblikkVisning: string[];
}

export interface pdlRequest {
    fnr: string | null;
    behandlingsnummer: string | null;
}

export interface Fnr {
    fnr: string | null;
}

export interface Gjeldende14aVedtak {
    innsatsgruppe: string;
    hovedmal: string;
    fattetDato: string;
}

export interface GjeldendeOppfolgingsperiode {
    uuid: string;
    startDato: string;
    sluttDato: string;
}

export interface OpplysningerOmArbeidssokerMedProfilering {
    arbeidssoekerperiodeStartet?: string;
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssoker | null;
    profilering: Profilering | null;
}

export type RequestTypes = FrontendEvent | overblikkVisningRequest | pdlRequest | Fnr;

export const endepunkter = {
    VEILARBPERSON_EVENT: '/veilarbperson/api/logger/event',
    VEILARBFILTER_OVERBLIKKVISNING: '/veilarbfilter/api/overblikkvisning',
    VEILARBPERSON_HENT_CV_OG_JOBBPROFIL: '/veilarbperson/api/v3/person/hent-cv_jobbprofil',
    VEILARBPERSON_HENT_TILGANGTILBRUKER: '/veilarbperson/api/v3/person/hent-tilgangTilBruker',
    VEILARBPERSON_HENT_PERSON: '/veilarbperson/api/v3/hent-person-tilgangsstyrt',
    VEILARBPERSON_HENT_SISTE_OPPLYSNINGER_OM_ARBEIDSSOEKER_MED_PROFILERING:
        '/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering',
    VEILARBPERSON_HENT_TOLK: '/veilarbperson/api/v3/person/hent-tolk',
    VEILARBPERSON_HENT_VERGEOGFULLMAKT: '/veilarbperson/api/v3/person/hent-vergeOgFullmakt',
    VEILARBPERSON_HENT_FULLMAKT: '/veilarbperson/api/v3/person/hent-fullmakt',
    VEILARBPERSON_HENT_AKTORID: '/veilarbperson/api/v3/person/hent-aktorid',
    VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING: '/veilarboppfolging/api/v2/hent-underOppfolging',
    VEILARBOPPFOLGING_HENT_STATUS: '/veilarboppfolging/api/v3/oppfolging/hent-status',
    VEILARBOPPFOLGING_HENT_OPPFOLGINGSSTATUS: '/veilarboppfolging/api/v2/person/hent-oppfolgingsstatus',
    VEILARBVEDTAKSSTOTTE_HENT_GJELDENDE_14A_VEDTAK: '/veilarbvedtaksstotte/api/hent-gjeldende-14a-vedtak',
    VEILARBVEDTAKSSTOTTE_INNSATSGRUPPEOGHOVEDMAL: '/veilarbvedtaksstotte/open/api/v2/kodeverk/innsatsgruppeoghovedmal',
    VEILARBARENA_HENT_YTELSER: '/veilarbarena/api/v2/arena/hent-ytelser',
    VEILARBVEILEDER_VEILEDER: '/veilarbveileder/api/veileder/'
} as const;
export type Endepunkt = (typeof endepunkter)[keyof typeof endepunkter];

const handterRespons = async (respons: Response) => {
    const korrelasjonId = respons.headers.get(customResponseHeaders.NAV_CALL_ID) ?? null;

    if (respons.status >= 400) {
        throw {
            error: new Error('An error occurred while fetching the data.'),
            status: respons.status,
            info: null,
            korrelasjonId: korrelasjonId
        };
    }
    if (respons.status === 204) {
        return {
            error: null,
            status: respons.status,
            info: null,
            korrelasjonId: korrelasjonId
        };
    }

    try {
        return await respons.text().then((res) => (!res ? null : JSON.parse(res)));
    } catch (err) {
        throw {
            error: err,
            status: null,
            info: null,
            korrelasjonId: korrelasjonId
        };
    }
};

const fetcher = async (url: string) => {
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

const fetchWithPost = async (url: string, requestBody: RequestTypes) => {
    const respons = await fetch(url, createPOSToptions(requestBody));
    return handterRespons(respons);
};

export const sendEventTilVeilarbperson = async (event: FrontendEvent) => {
    const respons = await fetch(endepunkter.VEILARBPERSON_EVENT, createPOSToptions(event));

    return handterRespons(respons);
};

export const sendOverblikkFilter = async (request: overblikkVisningRequest) => {
    const respons = await fetch(endepunkter.VEILARBFILTER_OVERBLIKKVISNING, createPOSToptions(request));

    return handterRespons(respons);
};

export const useOverblikkFilter = () => {
    const { data, error, isLoading, mutate } = useSWR<overblikkVisningResponse, ErrorMessage>(
        endepunkter.VEILARBFILTER_OVERBLIKKVISNING,
        fetcher,
        {
            shouldRetryOnError: false,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return { data, isLoading, error, reFetch: mutate };
};
export const useCvOgJobbonsker = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<ArenaPerson, ErrorMessage>(
        fnr ? [endepunkter.VEILARBPERSON_HENT_CV_OG_JOBBPROFIL, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBPERSON_HENT_CV_OG_JOBBPROFIL, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useUnderOppfolging = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<UnderOppfolgingData, ErrorMessage>(
        fnr ? [endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useOppfolging = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<OppfolgingData, ErrorMessage>(
        fnr ? [endepunkter.VEILARBOPPFOLGING_HENT_STATUS, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBOPPFOLGING_HENT_STATUS, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useOppfolgingsstatus = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<OppfolgingsstatusData, ErrorMessage>(
        fnr ? [endepunkter.VEILARBOPPFOLGING_HENT_OPPFOLGINGSSTATUS, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBOPPFOLGING_HENT_OPPFOLGINGSSTATUS, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useHarTilgangTilBruker = (fnr?: string) => {
    return useSWR<boolean, ErrorMessage>(fnr ? [endepunkter.VEILARBPERSON_HENT_TILGANGTILBRUKER, fnr] : null, () =>
        fetchWithPost(endepunkter.VEILARBPERSON_HENT_TILGANGTILBRUKER, { fnr: fnr ?? null })
    );
};

export const usePersonalia = (fnr: string, behandlingsnummer: string) => {
    const { data, error, isLoading } = useSWR<PersonaliaInfo, ErrorMessage>(
        fnr ? [endepunkter.VEILARBPERSON_HENT_PERSON, fnr] : null,
        () =>
            fetchWithPost(endepunkter.VEILARBPERSON_HENT_PERSON, {
                fnr: fnr ?? null,
                behandlingsnummer: behandlingsnummer
            })
    );

    return { data, isLoading, error };
};

export const useOpplysningerOmArbeidssoekerMedProfilering = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<OpplysningerOmArbeidssokerMedProfilering, ErrorMessage>(
        fnr ? [endepunkter.VEILARBPERSON_HENT_SISTE_OPPLYSNINGER_OM_ARBEIDSSOEKER_MED_PROFILERING, fnr] : null,
        () =>
            fetchWithPost(endepunkter.VEILARBPERSON_HENT_SISTE_OPPLYSNINGER_OM_ARBEIDSSOEKER_MED_PROFILERING, {
                fnr: fnr ?? null
            })
    );

    return { data, isLoading, error };
};

export const useGjeldende14aVedtak = (fnr?: string) => {
    return useSWR<Gjeldende14aVedtak, ErrorMessage>(
        fnr ? [endepunkter.VEILARBVEDTAKSSTOTTE_HENT_GJELDENDE_14A_VEDTAK, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBVEDTAKSSTOTTE_HENT_GJELDENDE_14A_VEDTAK, { fnr: fnr ?? null })
    );
};

export const useTolk = (fnr: string, behandlingsnummer: string) => {
    const { data, error, isLoading } = useSWR<TilrettelagtKommunikasjonData, ErrorMessage>(
        fnr ? [endepunkter.VEILARBPERSON_HENT_TOLK, fnr] : null,
        () =>
            fetchWithPost(endepunkter.VEILARBPERSON_HENT_TOLK, {
                fnr: fnr ?? null,
                behandlingsnummer: behandlingsnummer
            })
    );

    return { data, isLoading, error };
};

export const useVergeOgFullmakt = (fnr?: string, behandlingsnummer?: string) => {
    const { data, error, isLoading } = useSWR<Vergemal, ErrorMessage>(
        fnr ? [endepunkter.VEILARBPERSON_HENT_VERGEOGFULLMAKT, fnr] : null,
        () =>
            fetchWithPost(endepunkter.VEILARBPERSON_HENT_VERGEOGFULLMAKT, {
                fnr: fnr ?? null,
                behandlingsnummer: behandlingsnummer
            })
    );

    return { data, isLoading, error };
};

export const useFullmakt = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<FullmaktData, ErrorMessage>(
        fnr ? [endepunkter.VEILARBPERSON_HENT_FULLMAKT, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBPERSON_HENT_FULLMAKT, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useYtelser = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<YtelseData, ErrorMessage>(
        fnr ? [endepunkter.VEILARBARENA_HENT_YTELSER, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBARENA_HENT_YTELSER, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useAktorId = (fnr?: string) => {
    const { data, error, isLoading } = useSWR<AktorId, ErrorMessage>(
        fnr ? [endepunkter.VEILARBPERSON_HENT_AKTORID, fnr] : null,
        () => fetchWithPost(endepunkter.VEILARBPERSON_HENT_AKTORID, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useVeileder = (veilederId: StringOrNothing) => {
    const { data, error, isLoading } = useSWR<VeilederData, ErrorMessage>(
        veilederId ? endepunkter.VEILARBVEILEDER_VEILEDER + veilederId : null,
        fetcher
    );

    return { data, isLoading, error };
};

export const useKodeverk14a = () => {
    const { data, error, isLoading } = useSWR<Kodeverk14a, ErrorMessage>(
        endepunkter.VEILARBVEDTAKSSTOTTE_INNSATSGRUPPEOGHOVEDMAL,
        fetcher
    );
    return { data, isLoading, error };
};
