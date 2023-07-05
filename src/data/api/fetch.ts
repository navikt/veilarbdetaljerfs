import { GEToptions } from './datatyper/apiGetOptions';
import { OppfolgingsstatusData } from './datatyper/oppfolgingsstatus';
import { PersonaliaV2Info } from './datatyper/personalia';
import { RegistreringsData } from './datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from './datatyper/tilrettelagtKommunikasjon';
import { StringOrNothing } from '../../utils/felles-typer';
import { VeilederData } from './datatyper/veileder';
import { YtelseData } from './datatyper/ytelse';

const handterRespons = async (respons: Response) => {
    if (respons.status >= 400) {
        throw new Error(respons.statusText);
    }

    if (respons.status === 204) {
        return null;
    }

    try {
        return await respons.json();
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
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

export const hentYtelser = async (fnr: string): Promise<YtelseData | null> => {
    const url = `/veilarboppfolging/api/person/${fnr}/ytelser`;
    const respons = await fetch(url, GEToptions);

    return handterRespons(respons);
};
