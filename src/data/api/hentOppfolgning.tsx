
const hentOppfolgning = async (fnr: string): Promise<any> =>  {

    const url = `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
    
    }
    
    export default hentOppfolgning;
    
    