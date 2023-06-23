
const hentVeileder = () =>  {

const url = `/veilarbveileder/api/veileder/1`;
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