import { setupWorker } from 'msw/browser';
import { allHandlers } from './api';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...allHandlers);
