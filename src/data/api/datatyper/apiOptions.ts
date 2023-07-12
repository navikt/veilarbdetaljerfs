import { FrontendEvent } from '../../../utils/logger';

export const GEToptions = {
    method: 'GET',
    headers: {
        'Nav-Consumer-Id': 'veilarbdetaljerfs',
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

export const createPOSToptions = (event: FrontendEvent) => ({
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
        'Nav-Consumer-Id': 'veilarbdetaljerfs'
    }
});
