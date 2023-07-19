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

// FÅ PÅ SWR-CONFIG, IKKE FLERE RETRIES ETTER ERROR!

export interface ErrorTest {
    error: Error;
    status: number;
    info: StringOrNothing;
}

const handterRespons = async (respons: Response) => {
    // if (respons.status >= 400 && !(respons.status === 401 || respons.status === 403 || respons.status === 404)) {
    if (respons.status >= 400) {
        const errorTest: ErrorTest = {
            error: new Error('An error occurred while fetching the data.'),
            status: respons.status,
            info: await respons.json()
        };
        throw errorTest;
    }

    // if (respons.status === 204 || respons.status === 401 || respons.status === 403 || respons.status === 404) {
    //     const errorTest: ErrorTest = {
    //         error: new Error('An error occurred while fetching the data.'),
    //         status: respons.status,
    //         info: await respons.json()
    //     };
    //     throw errorTest;
    // }

    try {
        return await respons.json();
    } catch (error) {
        throw error;
    }
};

const fetcher = async (url: string): Promise<any> => {
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const sendEventTilVeilarbperson = async (event: FrontendEvent): Promise<any> => {
    const url = `/veilarbperson/api/logger/event`;
    const respons = await fetch(url, createPOSToptions(event));

    return handterRespons(respons);
};

export const useCvOgJobbonsker = (fnr: string) => {
    const { data, error, isLoading } = useSWR<ArenaPerson>(
        `/veilarbperson/api/person/cv_jobbprofil?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useUnderOppfolging = (fnr: string) => {
    const { data, error, isLoading } = useSWR<UnderOppfolgingData>(
        `/veilarboppfolging/api/underoppfolging?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useOppfolgingsstatus = (fnr: string) => {
    const { data, error, isLoading } = useSWR<OppfolgingsstatusData>(
        `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`,
        fetcher
    );

    return { data, isLoading, error };
};

export const usePersonalia = (fnr: string) => {
    const { data, error, isLoading } = useSWR<PersonaliaV2Info>(`/veilarbperson/api/v2/person?fnr=${fnr}`, fetcher);

    return { data, isLoading, error };
};

export const useRegistrering = (fnr: string) => {
    const { data, error, isLoading } = useSWR<RegistreringsData>(
        `/veilarbperson/api/person/registrering?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useTolk = (fnr: string) => {
    const { data, error, isLoading } = useSWR<TilrettelagtKommunikasjonData>(
        `/veilarbperson/api/v2/person/tolk?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useVergeOgFullmakt = (fnr: string) => {
    const { data, error, isLoading } = useSWR<VergeOgFullmaktData>(
        `/veilarbperson/api/v2/person/vergeOgFullmakt?fnr=${fnr}`,
        fetcher
    );

    return { data, isLoading, error };
};

export const useYtelser = (fnr: string) => {
    const { data, error, isLoading } = useSWR<YtelseData>(`/veilarboppfolging/api/person/${fnr}/ytelser`, fetcher);

    return { data, isLoading, error };
};

export const useAktorId = (fnr: string) => {
    const { data, error, isLoading } = useSWR<AktorId>(`/veilarbperson/api/person/aktorid?fnr=${fnr}`, fetcher);

    return { data, isLoading, error };
};

export const useVeileder = (veilederId: string) => {
    const { data, error, isLoading } = useSWR<VeilederData>(`/veilarbveileder/api/veileder/${veilederId}`, fetcher);

    return { data, isLoading, error };
};
