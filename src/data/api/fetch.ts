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

export interface ErrorTest {
    error: Error;
    status: number;
    info: string;
}

const handterRespons = async (respons: Response) => {
    if (respons.status === 204 || respons.status === 404 || respons.status === 403) {
        return respons.ok;
    }

    if (respons.status >= 400) {
        throw new Error(respons.statusText);
    }

    try {
        return await respons.json();
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
    }
};
const handterResponsv2 = async (respons: Response) => {
    if (respons.status >= 400 && !(respons.status === 401 || respons.status === 403 || respons.status === 404)) {
        // throw new Error(respons.statusText);
        // const error = new Error('An error occurred while fetching the data.');
        const errorTest: ErrorTest = {
            error: new Error('An error occurred while fetching the data.'),
            status: respons.status,
            info: await respons.json()
        };
        throw errorTest;
        // Attach extra info to the error object.
        // error.info = await res.json();
        // error.status = res.status;
        // throw error;
    }

    if (respons.status === 204 || respons.status === 401 || respons.status === 403 || respons.status === 404) {
        const errorTest: ErrorTest = {
            error: new Error('An error occurred while fetching the data.'),
            status: respons.status,
            info: await respons.json()
        };
        throw errorTest;
        // const ReturnObject: ReturnData<any> = {
        //     value: null,
        //     status: respons.status
        // };
        // return ReturnObject;
    }
    try {
        return await respons.json();
    } catch (error) {
        throw error;
    }
};

export const hentOppfolgingsstatus = async (fnr: string): Promise<OppfolgingsstatusData | null> => {
    const url = `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const hentPersonalia = async (fnr: string): Promise<PersonaliaV2Info | null> => {
    const url = `/veilarbperson/api/v2/person?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const hentRegistrering = async (fnr: string): Promise<RegistreringsData | null> => {
    const url = `/veilarbperson/api/person/registrering?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const hentTolk = async (fnr: string): Promise<TilrettelagtKommunikasjonData | null> => {
    const url = `/veilarbperson/api/v2/person/tolk?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const hentVeileder = async (veilederId: StringOrNothing): Promise<VeilederData | null> => {
    const url = `/veilarbveileder/api/veileder/${veilederId}`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const hentVergeOgFullmakt = async (fnr: string): Promise<VergeOgFullmaktData | null> => {
    const url = `/veilarbperson/api/v2/person/vergeOgFullmakt?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const hentYtelser = async (fnr: string): Promise<YtelseData | null> => {
    const url = `/veilarboppfolging/api/person/${fnr}/ytelser`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};

export const hentCvOgJobbonsker = async (fnr: string): Promise<ArenaPerson> => {
    const url = `/veilarbperson/api/person/cv_jobbprofil?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);
    // if (respons.status >= 400 && !(respons.status === 401 || respons.status === 403 || respons.status === 404)) {
    //     // throw new Error(respons.statusText);
    //     // const error = new Error('An error occurred while fetching the data.');
    //     const error = new Error
    //     // Attach extra info to the error object.
    //     error.info = await respons.json();
    //     error.status = respons.status;
    //     throw error;
    // }
    // return respons.json();

    return handterResponsv2(respons);
};

export const hentCvOgJobbonskerv2 = async (fnr: string): Promise<ArenaPerson | null> => {
    const url = `/veilarbperson/api/person/cv_jobbprofil?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);
    // const data = await respons.json();
    // return data;
    // return fetch(url, GEToptions).then((r) => r.json());

    return handterRespons(respons);
};
export const hentUnderOppfolging = async (fnr: string): Promise<UnderOppfolgingData | null> => {
    const url = `/veilarboppfolging/api/underoppfolging?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};
export const hentAktorId = async (fnr: string): Promise<AktorId | null> => {
    const url = `/veilarbperson/api/person/aktorid?fnr=${fnr}`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};
export const sendEventTilVeilarbperson = async (event: FrontendEvent): Promise<any> => {
    const url = `/veilarbperson/api/logger/event`;
    const respons = await fetch(url, createPOSToptions(event));

    return handterRespons(respons);
};
