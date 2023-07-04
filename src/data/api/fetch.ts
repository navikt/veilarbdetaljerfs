import { GEToptions } from './datatyper/apiGetOptions';
import { OppfolgingsstatusData } from './datatyper/oppfolgingsstatus';
import { PersonaliaV2Info } from './datatyper/personalia';
import { RegistreringsData } from './datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from './datatyper/tilrettelagtKommunikasjon';
import { StringOrNothing } from '../../utils/felles-typer';
import { VeilederData } from './datatyper/veileder';
import { YtelseData } from './datatyper/ytelse';


export interface ReturnData<T> {
    status: "SUCCSESS" | "FAILURE"
    data: T | null;
}


// export const hentOppfolgingsstatusv2 = async (fnr: string): Promise<ReturnData<OppfolgingsstatusData>> => {
    
//     const url = `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`;

//     try {
//         const response = await fetch(url, GEToptions);
//         const data = await response.json();
//         return {status: "SUCCSESS",data: data as OppfolgingsstatusData}
        
//     } catch (error) {
//         return {status: "SUCCSESS",data: null}
//     }
// };
export const hentOppfolgingsstatus = async (fnr: string): Promise<OppfolgingsstatusData> => {
    
    const url = `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`;
    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;        
};

export const hentPersonalia = async (fnr: string): Promise<PersonaliaV2Info> => {
    const url = `/veilarbperson/api/v2/person?fnr=${fnr}`;
    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;
};

export const hentRegistrering = async (fnr: string): Promise<RegistreringsData> => {
    const url = `/veilarbperson/api/person/registrering?fnr=${fnr}`;
    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;
};

export const hentTolk = async (fnr: string): Promise<TilrettelagtKommunikasjonData> => {
    const url = `/veilarbperson/api/v2/person/tolk?fnr=${fnr}`;
    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;
};

export const hentVeileder = async (veilederId: StringOrNothing): Promise<VeilederData> => {
    const url = `/veilarbveileder/api/veileder/${veilederId}`;
    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;
};

export const hentYtelser = async (fnr: string): Promise<YtelseData> => {
    const url = `/veilarboppfolging/api/person/${fnr}/ytelser`;
    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;
};
