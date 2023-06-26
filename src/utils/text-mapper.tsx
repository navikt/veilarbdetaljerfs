import { VeilederData } from '../data/api/datatyper/veileder';

export function hentVeilederTekst(veileder: VeilederData | null): String {
	if (!veileder) {
		return "";
	}

	return `${veileder.navn}, ${veileder.ident}`;
}