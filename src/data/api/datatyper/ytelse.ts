import { StringOrNothing } from '../../../utils/felles-typer';

export interface VedtakType {
    aktivitetsfase: StringOrNothing;
    type: StringOrNothing;
    status: StringOrNothing;
    fraDato?: StringOrNothing;
    tilDato?: StringOrNothing;
}

export interface YtelseData {
    vedtak: VedtakType[];
}
