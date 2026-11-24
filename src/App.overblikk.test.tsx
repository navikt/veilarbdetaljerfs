import { expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import App from './App.tsx';

const api = vi.hoisted(() => ({
    data: { overblikkVisning: ['CV', 'Ytelser'] },
    send: vi.fn().mockResolvedValue(undefined),
    reFetch: vi.fn().mockResolvedValue(undefined)
}));

vi.mock('./data/api/fetch', () => ({
    useOverblikkFilter: () => ({ data: api.data, reFetch: api.reFetch }),
    sendOverblikkFilter: api.send
}));
vi.mock('./Tilgangssjekk', () => ({ Tilgangssjekk: ({ children }: { children: ReactNode }) => children }));
vi.mock('./stores/store-provider', () => ({ default: ({ children }: { children: ReactNode }) => children }));
vi.mock('./components/nokkelinfo', () => ({ default: () => null }));
vi.mock('./components/cv-innhold', () => ({ default: () => null }));
vi.mock('./components/jobbonsker-innhold', () => ({ default: () => null }));
vi.mock('./components/oppfolging-innhold', () => ({ default: () => null }));
vi.mock('./components/personalia-innhold', () => ({ default: () => null }));
vi.mock('./components/registrering-innhold', () => ({ default: () => null }));
vi.mock('./components/ytelser-innhold', () => ({ default: () => <div>Ytelsesinnhold</div> }));
vi.mock('./components/felles/til-toppen-knapp', () => ({ default: () => null }));
vi.mock('./components/registrering/arbeidssoekerregistrering/personverninformasjon-manuell', () => ({
    default: () => null
}));

test('viser lagrede ytelser og lagrer backendverdien', async () => {
    render(<App theme="light" />);

    expect(screen.getByRole('heading', { name: 'Ytelser (Arena)' })).toBeTruthy();
    expect(screen.getByText('Ytelsesinnhold')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Lagre visning for alle brukere' }));

    await waitFor(() => expect(api.send).toHaveBeenCalledWith({ overblikkVisning: ['CV', 'Ytelser'] }));
});
