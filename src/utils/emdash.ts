import { StringOrNothing } from "./felles-typer";

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export default EMDASH;

export function visEmdashHvisNull(verdi: StringOrNothing) {
	return verdi ? verdi : EMDASH;
}
