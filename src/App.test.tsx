import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import App from './App.tsx';

describe('App test', () => {
    test('Applikasjonen rendrer uten feil', () => {
        render(<App fnr={'12345678900'} />);
    });
});
