const hentPersonalia = async (fnr: string): Promise<any> =>  {

    const url = `/veilarbperson/api/v2/person?fnr=${fnr}`;
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

export default hentPersonalia;

