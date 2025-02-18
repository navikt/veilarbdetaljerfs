import { GjeldendeOppfolgingsperiode, Siste14aVedtak } from '../data/api/fetch.ts';
import { isAfter, isBefore, parseISO, subDays } from 'date-fns';

export const sjekkOmSiste14aVedtakErGjeldende = (
    siste14avedtak: Siste14aVedtak | undefined,
    gjeldendeOppfolgingsperiode: GjeldendeOppfolgingsperiode | undefined
) => {
    if (!siste14avedtak || !gjeldendeOppfolgingsperiode) {
        return false;
    }

    const siste14aVedtakfattetDatoIso = parseISO(siste14avedtak.fattetDato);
    const gjeldendeOppfolgingsperiodeStartDato = parseISO(gjeldendeOppfolgingsperiode.startDato);
    const oppfolgingsperiodeLanseringsdato = parseISO('2017-12-04T00:00:00+02:00');

    // 2025-02-18
    // Vi har oppdaget at vedtak fattet i Arena får "fattetDato" lik midnatt den dagen vedtaket ble fattet.
    // Derfor har vi valgt å innfør en "grace periode" på 4 døgn. Dvs. dersom vedtaket ble fattet etter
    // "oppfølgingsperiode startdato - 4 døgn", så anser vi det som gjeldende.
    return (
        isAfter(siste14aVedtakfattetDatoIso, subDays(gjeldendeOppfolgingsperiodeStartDato, 4)) ||
        (isBefore(siste14aVedtakfattetDatoIso, oppfolgingsperiodeLanseringsdato) &&
            !isAfter(gjeldendeOppfolgingsperiodeStartDato, oppfolgingsperiodeLanseringsdato))
    );
};
