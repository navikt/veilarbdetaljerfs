import { Alert, Loader } from '@navikt/ds-react';
import { useAppStore } from '../../stores/app-store.ts';
import { useErReservertIKrr } from '../../data/api/fetch.ts';

export const ReservasjonKrr = () => {
    const { fnr } = useAppStore();
    const { data: reservertIKrr, isLoading } = useErReservertIKrr(fnr!);

    if (isLoading) {
        return <Loader size="small" />;
    }

    const erReservertMotDigitalKommunikasjonIKrr = reservertIKrr || false;

    return erReservertMotDigitalKommunikasjonIKrr ? (
        <Alert variant="info" className="reservert-krr-info" size="small">
            Er reservert mot digital kommunikasjon i Kontakt - og reservasjonsregisteret (KRR)
        </Alert>
    ) : null;
};
