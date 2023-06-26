export interface Veileder {
	ident: string;
	enhet?: {
		id: string;
		navn: string;
	};
}

interface RegistreringBase {
	opprettetDato: string;
	teksterForBesvarelse: Sporsmal[];
	manueltRegistrertAv?: Veileder | null;
	besvarelse: any; // TODO: Fix typing
}

export interface OrdinaerRegistrering extends RegistreringBase {
	profilering?: Profilering;
}

export type SykmeldtRegistrering = RegistreringBase;

export type InnsatsgruppeType = 'STANDARD_INNSATS' | 'SITUASJONSBESTEMT_INNSATS' | 'BEHOV_FOR_ARBEIDSEVNEVURDERING';

export interface Profilering {
	jobbetSammenhengendeSeksAvTolvSisteManeder: boolean;
	innsatsgruppe: InnsatsgruppeType;
}

export type RegistreringType = 'ORDINAER' | 'SYKMELDT';

export type Registrering = OrdinaerRegistrering | SykmeldtRegistrering;

export interface RegistreringsData {
	type?: RegistreringType;
	registrering?: Registrering;
}

export interface Sporsmal {
	sporsmalId: string;
	sporsmal: string;
	svar: string;
}
