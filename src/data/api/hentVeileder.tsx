<<<<<<< HEAD
import { GEToptions } from './datatyper/apiGetOptions';

export const hentVeileder = async (veilederId: string): Promise<any> => {
    const url = `/veilarbveileder/api/veileder/${veilederId}`;

    const response = await fetch(url, GEToptions);
    const data = await response.json();
    return data;
};
=======

const hentVeileder = (veilederId: string) =>  {

const url = `/veilarbveileder/api/veileder/${veilederId}`;
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    return data
  });
}

export default hentVeileder;
>>>>>>> 1817490 (lagt til datastruktur)
