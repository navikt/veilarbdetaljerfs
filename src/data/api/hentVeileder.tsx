const hentVeileder = async (veilederId: string): Promise<any> => {
    const url = `/veilarbveileder/api/veileder/${veilederId}`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export default hentVeileder;
