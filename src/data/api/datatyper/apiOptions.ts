import { FrontendEvent } from '../../../utils/logger';
import { overblikkVisningRequest } from '../fetch.ts';

export const GEToptions = {
    method: 'GET',
    headers: {
        'Nav-Consumer-Id': 'veilarbdetaljerfs',
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

export const createPOSToptions = (event: FrontendEvent | overblikkVisningRequest) => ({
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
        'Nav-Consumer-Id': 'veilarbdetaljerfs'
    }
});
