import { StringOrNothing } from '../../utils/felles-typer';
import { VeilederData } from './datatyper/veileder';

const APP_NAME = 'veilarbdetaljerfs';

const hentVeileder = async (veilederId: StringOrNothing): Promise<VeilederData> => {
    const url = `/veilarbveileder/api/veileder/${veilederId}`;
    const options = {
        method: 'GET',
        headers: {
            'Nav-Consumer-Id': APP_NAME,
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export default hentVeileder;
