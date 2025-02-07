import { GjeldendeOppfolgingsperiode, Siste14aVedtak } from '../data/api/fetch.ts';
import { isAfter, isBefore, parseISO } from 'date-fns';

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

    return (
        isAfter(siste14aVedtakfattetDatoIso, gjeldendeOppfolgingsperiodeStartDato) ||
        (isBefore(siste14aVedtakfattetDatoIso, oppfolgingsperiodeLanseringsdato) &&
            !isAfter(gjeldendeOppfolgingsperiodeStartDato, oppfolgingsperiodeLanseringsdato))
    );
};
