import { GEToptions } from './datatyper/apiGetOptions';
const hentVeileder = async (veilederId: string): Promise<any> =>  {

import { GEToptions } from './datatyper/apiGetOptions';

export const hentVeileder = async (veilederId: string): Promise<any> => {
    const url = `/veilarbveileder/api/veileder/${veilederId}`;

    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;
};