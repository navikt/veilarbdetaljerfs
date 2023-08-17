import { GEToptions, createPOSToptions } from './datatyper/apiOptions';
import { OppfolgingsstatusData } from './datatyper/oppfolgingsstatus';
import { PersonaliaV2Info } from './datatyper/personalia';
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

interface ErrorMessage {
    error: Error | unknown;
    status?: number | null;
    info: StringOrNothing;
}

const handterRespons = async (respons: Response) => {
    if (respons.status >= 400) {
        const error: ErrorMessage = {
            error: new Error('An error occurred while fetching the data.'),
            status: respons.status,
            info: await respons.json()
        };
        throw error;
    }
    if (respons.status === 204) {
        const error: ErrorMessage = {
            error: new Error('No content'),
            status: respons.status,
            info: null
        };
        throw error;
    }

    try {
        return await respons.json();
    } catch (err) {
        const error: ErrorMessage = {
            error: err,
            status: null,
            info: null
        };
        throw error;
    }
};

const fetcher = async (url: string) => {
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const sendEventTilVeilarbperson = async (event: FrontendEvent) => {
    const url = `/veilarbperson/api/logger/event`;
    const respons = await fetch(url, createPOSToptions(event));

    return handterRespons(respons);
};

export const sendOverblikkFilter = async (event: string[]): Promise<string[]> => {
    const url = `/veilarbfilter/api/overblikkvisning`;
    const respons = await fetch(url, createPOSToptions(event));

    return handterRespons(respons);
};

export const useOverblikkFilter = () => {
    const { data, error, isLoading, mutate } = useSWR<{overblikkVisning: string[]}, ErrorMessage>(
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
export const useCvOgJobbonsker = (fnr: string) => {
    const { data, error, isLoading } = useSWR<ArenaPerson, ErrorMessage>(
        `/veilarbperson/api/person/cv_jobbprofil?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useUnderOppfolging = (fnr: string) => {
    const { data, error, isLoading } = useSWR<UnderOppfolgingData, ErrorMessage>(
        `/veilarboppfolging/api/underoppfolging?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useOppfolgingsstatus = (fnr: string) => {
    const { data, error, isLoading } = useSWR<OppfolgingsstatusData, ErrorMessage>(
        `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`,
        fetcher
    );

    return { data, isLoading, error };
};

export const usePersonalia = (fnr: string) => {
    const { data, error, isLoading } = useSWR<PersonaliaV2Info, ErrorMessage>(
        `/veilarbperson/api/v2/person?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useRegistrering = (fnr: string) => {
    const { data, error, isLoading } = useSWR<RegistreringsData, ErrorMessage>(
        `/veilarbperson/api/person/registrering?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useTolk = (fnr: string) => {
    const { data, error, isLoading } = useSWR<TilrettelagtKommunikasjonData, ErrorMessage>(
        `/veilarbperson/api/v2/person/tolk?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useVergeOgFullmakt = (fnr: string) => {
    const { data, error, isLoading } = useSWR<VergeOgFullmaktData, ErrorMessage>(
        `/veilarbperson/api/v2/person/vergeOgFullmakt?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useYtelser = (fnr: string) => {
    const { data, error, isLoading } = useSWR<YtelseData, ErrorMessage>(
        `/veilarboppfolging/api/person/${fnr}/ytelser`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useAktorId = (fnr: string) => {
    const { data, error, isLoading } = useSWR<AktorId, ErrorMessage>(
        `/veilarbperson/api/person/aktorid?fnr=${fnr}`,
        fetcher
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
