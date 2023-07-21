import { FrontendEvent } from '../../../utils/logger';
import { ChipsData } from './chips';

export const GEToptions = {
    method: 'GET',
    headers: {
        'Nav-Consumer-Id': 'veilarbdetaljerfs',
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

export const createPOSToptions = (event: FrontendEvent | ChipsData) => ({
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
        'Nav-Consumer-Id': 'veilarbdetaljerfs'
    }
});
