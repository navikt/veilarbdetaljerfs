import { OrNothing, StringOrNothing } from '../../../utils/felles-typer';

export interface DatoType {
    year: string;
    month: string;
    day: string;
}

export interface VedtakType {
    aktivitetsfase: StringOrNothing;
    vedtakstype: StringOrNothing;
    status: StringOrNothing;
    fradato?: OrNothing<DatoType>;
    tildato?: OrNothing<DatoType>;
}

export interface YtelseData {
    vedtaksliste: VedtakType[];
}
