import { RequestTypes } from '../fetch';

const customRequestHeaders = {
    NAV_CONSUMER_ID: 'Nav-Consumer-Id'
} as const;

export const customResponseHeaders = {
    NAV_CALL_ID: 'Nav-Call-Id'
} as const;

export const GEToptions = {
    method: 'GET',
    headers: {
        [customRequestHeaders.NAV_CONSUMER_ID]: 'veilarbdetaljerfs',
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

export const createPOSToptions = (event: RequestTypes) => ({
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
        'Content-Type': 'application/json',
        [customRequestHeaders.NAV_CONSUMER_ID]: 'veilarbdetaljerfs'
    }
});
