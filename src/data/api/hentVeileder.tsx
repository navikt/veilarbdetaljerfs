
const hentVeileder =  (veilederId: string) =>  {

const url = `/veilarbveileder/api/veileder/${veilederId}`;
const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};
fetch(url, options)
}

export default hentVeileder;

