import { setupWorker } from 'msw';
import { allHandlers } from './api';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...allHandlers)
    .start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } })
    .catch((e) => {
        console.error('Unable to setup mocked API endpoints', e);
    });
