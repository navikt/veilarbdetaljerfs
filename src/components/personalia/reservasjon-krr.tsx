import { Alert, Loader } from '@navikt/ds-react';
import { useAppStore } from '../../stores/app-store.ts';
import { useOppfolging } from '../../data/api/fetch.ts';

export const ReservasjonKrr = () => {
    const { fnr } = useAppStore();
    const { data, isLoading } = useOppfolging(fnr!);

    if (isLoading) {
        return <Loader size="small" />;
    }

    const erReservertFraKrr = data?.reservasjonKRR || false;

    return erReservertFraKrr ? (
        <Alert variant="info" className="reservert-krr-info" size="small">
            Er reservert i Kontakt - og reservasjonsregisteret (KRR)
        </Alert>
    ) : null;
};
