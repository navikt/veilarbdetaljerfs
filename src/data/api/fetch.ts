import { createPOSToptions, GEToptions } from './datatyper/apiOptions';
import { OppfolgingsstatusData } from './datatyper/oppfolgingsstatus';
import { PersonaliaInfo } from './datatyper/personalia';
import { RegistreringsData } from './datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from './datatyper/tilrettelagtKommunikasjon';
import { StringOrNothing } from '../../utils/felles-typer';
import { VeilederData } from './datatyper/veileder';
import { YtelseData } from './datatyper/ytelse';
import { VergeOgFullmaktData } from './datatyper/vergeOgFullmakt';
import { ArenaPerson } from './datatyper/arenaperson';
import { UnderOppfolgingData } from './datatyper/underOppfolgingData';
import { AktorId } from './datatyper/aktor-id';
import { FrontendEvent } from '../../utils/logger';
import useSWR from 'swr';
import { EndringIRegistreringsdata } from './datatyper/endringIRegistreringsData';

interface ErrorMessage {
    error: Error | unknown;
    status?: number | null;
    info: StringOrNothing;
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

const handterRespons = async (respons: Response) => {
    if (respons.status >= 400) {
        throw {
            error: new Error('An error occurred while fetching the data.'),
            status: respons.status,
            info: null
        };
    }
    if (respons.status === 204) {
        return {
            error: null,
            status: respons.status,
            info: null
        };
    }

    try {
        return await respons.json();
    } catch (err) {
        throw {
            error: err,
            status: null,
            info: null
        };
    }
};

const fetcher = async (url: string) => {
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

const fetchWithPost = async (url: string, requestBody: FrontendEvent | overblikkVisningRequest | pdlRequest | Fnr) => {
    const respons = await fetch(url, createPOSToptions(requestBody));
    return handterRespons(respons);
};

export const sendEventTilVeilarbperson = async (event: FrontendEvent) => {
    const url = `/veilarbperson/api/logger/event`;
    const respons = await fetch(url, createPOSToptions(event));

    return handterRespons(respons);
};

export const sendOverblikkFilter = async (request: overblikkVisningRequest) => {
    const url = `/veilarbfilter/api/overblikkvisning`;
    const respons = await fetch(url, createPOSToptions(request));

    return handterRespons(respons);
};

export const useOverblikkFilter = () => {
    const { data, error, isLoading, mutate } = useSWR<overblikkVisningResponse, ErrorMessage>(
        `/veilarbfilter/api/overblikkvisning`,
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
    const url = '/veilarbperson/api/v3/person/hent-cv_jobbprofil';
    const { data, error, isLoading } = useSWR<ArenaPerson, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useUnderOppfolging = (fnr?: string) => {
    const url = `/veilarboppfolging/api/v2/hent-underOppfolging`;
    const { data, error, isLoading } = useSWR<UnderOppfolgingData, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useOppfolgingsstatus = (fnr?: string) => {
    const url = `/veilarboppfolging/api/v2/person/hent-oppfolgingsstatus`;
    const { data, error, isLoading } = useSWR<OppfolgingsstatusData, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const usePersonalia = (fnr: string, behandlingsnummer: string) => {
    const url = '/veilarbperson/api/v3/hent-person';
    const { data, error, isLoading } = useSWR<PersonaliaInfo, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null, behandlingsnummer: behandlingsnummer })
    );

    return { data, isLoading, error };
};

export const useRegistrering = (fnr?: string) => {
    const url = '/veilarbperson/api/v3/person/hent-registrering';
    const { data, error, isLoading } = useSWR<RegistreringsData, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useEndringIRegistrering = (fnr?: string) => {
    const url = '/veilarbperson/api/v3/person/registrering/hent-endringer';
    const { data, error, isLoading } = useSWR<EndringIRegistreringsdata, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useTolk = (fnr: string, behandlingsnummer: string) => {
    const url = '/veilarbperson/api/v3/person/hent-tolk';
    const { data, error, isLoading } = useSWR<TilrettelagtKommunikasjonData, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null, behandlingsnummer: behandlingsnummer })
    );

    return { data, isLoading, error };
};

export const useVergeOgFullmakt = (fnr?: string, behandlingsnummer?: string) => {
    const url = '/veilarbperson/api/v3/person/hent-vergeOgFullmakt';
    const { data, error, isLoading } = useSWR<VergeOgFullmaktData, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null, behandlingsnummer: behandlingsnummer })
    );

    return { data, isLoading, error };
};

export const useYtelser = (fnr?: string) => {
    const url = `/veilarboppfolging/api/v2/person/hent-ytelser`;
    const { data, error, isLoading } = useSWR<YtelseData, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useAktorId = (fnr?: string) => {
    const url = '/veilarbperson/api/v3/person/hent-aktorid';
    const { data, error, isLoading } = useSWR<AktorId, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useVeileder = (veilederId: StringOrNothing) => {
    const { data, error, isLoading } = useSWR<VeilederData, ErrorMessage>(
        veilederId ? `/veilarbveileder/api/veileder/` + veilederId : null,
        fetcher
    );

    return { data, isLoading, error };
};
