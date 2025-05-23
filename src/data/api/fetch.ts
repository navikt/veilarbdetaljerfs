import { createPOSToptions, GEToptions } from './datatyper/apiOptions';
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
        return await respons.text().then((res) => (!res ? null : JSON.parse(res)));
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

const fetchWithPost = async (url: string, requestBody: RequestTypes) => {
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

export const useOppfolging = (fnr?: string) => {
    const url = `/veilarboppfolging/api/v3/oppfolging/hent-status`;
    const { data, error, isLoading } = useSWR<OppfolgingData, ErrorMessage>(fnr ? url : null, () =>
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

export const useHarTilgangTilBruker = (fnr?: string) => {
    const url = '/veilarbperson/api/v3/person/hent-tilgangTilBruker';
    return useSWR<boolean, ErrorMessage>(fnr ? url : null, () => fetchWithPost(url, { fnr: fnr ?? null }));
};

export const usePersonalia = (fnr: string, behandlingsnummer: string) => {
    const url = '/veilarbperson/api/v3/hent-person';
    const { data, error, isLoading } = useSWR<PersonaliaInfo, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null, behandlingsnummer: behandlingsnummer })
    );

    return { data, isLoading, error };
};

export const useOpplysningerOmArbeidssoekerMedProfilering = (fnr?: string) => {
    const url = '/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering';
    const { data, error, isLoading } = useSWR<OpplysningerOmArbeidssokerMedProfilering, ErrorMessage>(
        fnr ? url : null,
        () => fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useGjeldende14aVedtak = (fnr?: string) => {
    const url = '/veilarbvedtaksstotte/api/hent-gjeldende-14a-vedtak';
    return useSWR<Gjeldende14aVedtak, ErrorMessage>(fnr ? url : null, () => fetchWithPost(url, { fnr: fnr ?? null }));
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
    const { data, error, isLoading } = useSWR<Vergemal, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null, behandlingsnummer: behandlingsnummer })
    );

    return { data, isLoading, error };
};

export const useFullmakt = (fnr?: string) => {
    const url: string = '/veilarbperson/api/v3/person/hent-fullmakt';
    const { data, error, isLoading } = useSWR<FullmaktData, ErrorMessage>(fnr ? url : null, () =>
        fetchWithPost(url, { fnr: fnr ?? null })
    );

    return { data, isLoading, error };
};

export const useYtelser = (fnr?: string) => {
    const url = `/veilarbarena/api/v2/arena/hent-ytelser`;
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

export const useKodeverk14a = () => {
    const url = `/veilarbvedtaksstotte/open/api/v2/kodeverk/innsatsgruppeoghovedmal`;
    const { data, error, isLoading } = useSWR<Kodeverk14a, ErrorMessage>(url, fetcher);
    return { data, isLoading, error };
};
