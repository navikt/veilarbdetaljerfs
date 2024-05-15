import { RequestTypes } from '../fetch.ts';

export const GEToptions = {
    method: 'GET',
    headers: {
        'Nav-Consumer-Id': 'veilarbdetaljerfs',
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

export const createPOSToptions = (event: RequestTypes) => ({
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
        'Content-Type': 'application/json',
        'Nav-Consumer-Id': 'veilarbdetaljerfs'
    }
});
