import { GEToptions } from './datatyper/apiGetOptions';
import { OppfolgingsstatusData } from './datatyper/oppfolgingsstatus';
import { PersonaliaV2Info } from './datatyper/personalia';
import { RegistreringsData } from './datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from './datatyper/tilrettelagtKommunikasjon';
import { StringOrNothing } from '../../utils/felles-typer';
import { VeilederData } from './datatyper/veileder';
import { YtelseData } from './datatyper/ytelse';

export const hentOppfolgingsstatus = async (fnr: string): Promise<OppfolgingsstatusData | null> => {
    const url = `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`;
    const response = await fetch(url, GEToptions);

    if (response.status >= 400) {
        const APIerror = new Error(response.statusText);
        console.log('hentOppfolgingsstatus', APIerror);
        throw new Error(response.statusText);
    }
    if (response.status === 204) {
        return null;
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
    }
};

export const hentPersonalia = async (fnr: string): Promise<PersonaliaV2Info | null> => {
    const url = `/veilarbperson/api/v2/person?fnr=${fnr}`;
    const response = await fetch(url, GEToptions);

    if (response.status >= 400) {
        const APIerror = new Error(response.statusText);
        console.log('hentPersonalia', APIerror);
        throw new Error(response.statusText);
    }
    if (response.status === 204) {
        return null;
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
    }
};

export const hentRegistrering = async (fnr: string): Promise<RegistreringsData | null> => {
    const url = `/veilarbperson/api/person/registrering?fnr=${fnr}`;
    const response = await fetch(url, GEToptions);

    if (response.status >= 400) {
        const APIerror = new Error(response.statusText);
        console.log('hentRegistrering', APIerror);
        throw new Error(response.statusText);
    }
    if (response.status === 204) {
        return null;
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
    }
};

export const hentTolk = async (fnr: string): Promise<TilrettelagtKommunikasjonData | null> => {
    const url = `/veilarbperson/api/v2/person/tolk?fnr=${fnr}`;
    const response = await fetch(url, GEToptions);

    if (response.status >= 400) {
        const APIerror = new Error(response.statusText);
        console.log('hentTolk', APIerror);
        throw new Error(response.statusText);
    }
    if (response.status === 204) {
        return null;
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
    }
};

export const hentVeileder = async (veilederId: StringOrNothing): Promise<VeilederData | null> => {
    const url = `/veilarbveileder/api/veileder/${veilederId}`;
    const response = await fetch(url, GEToptions);

    if (response.status >= 400) {
        const APIerror = new Error(response.statusText);
        console.log('hentVeileder', APIerror);
        throw new Error(response.statusText);
    }
    if (response.status === 204) {
        return null;
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
    }
};

export const hentYtelser = async (fnr: string): Promise<YtelseData | null> => {
    const url = `/veilarboppfolging/api/person/${fnr}/ytelser`;
    const response = await fetch(url, GEToptions);

    if (response.status >= 400) {
        const APIerror = new Error(response.statusText);
        console.log('hentYtelser', APIerror);
        throw new Error(response.statusText);
    }
    if (response.status === 204) {
        return null;
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ved parsing:', error);
        return null;
    }
};
