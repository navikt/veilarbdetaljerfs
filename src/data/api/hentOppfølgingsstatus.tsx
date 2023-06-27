import { OppfolgingsstatusData } from "./datatyper/oppfolgingsstatus";

const APP_NAME = "veilarbdetaljerfs"

const hentOppfolgingsstatus = async (fnr: String): Promise <OppfolgingsstatusData> => {
    const url = `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`
    const options = {
        method: "GET",
        headers: {
            'Nav-Consumer-Id': APP_NAME,
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
    };

const response = await fetch(url, options);
const data = await response.json();
return data;

}

export default hentOppfolgingsstatus;