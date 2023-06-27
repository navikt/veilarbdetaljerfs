import { setupWorker } from 'msw';
import { allHandlers } from './api';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...allHandlers)
    .start({ serviceWorker: { url: '/mockServiceWorker.js' } })
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.error('Unable to setup mocked API endpoints', e);
    });