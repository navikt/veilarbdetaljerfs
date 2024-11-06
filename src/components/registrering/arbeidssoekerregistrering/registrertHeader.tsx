import { BodyShort } from '@navikt/ds-react';
import { formaterDato } from '../../../utils/formater';
import Informasjonsbolk from '../../felles/informasjonsbolk';
import { SendtInnAv } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    sendtInnAv: SendtInnAv;
    arbeidssoekerperiodeStartet?: string;
}
export const RegistrertHeader = ({ sendtInnAv, arbeidssoekerperiodeStartet }: Props) => {
    const erManuellBruker = sendtInnAv.utfoertAv.type === 'VEILEDER';

    const overskrift = erManuellBruker
        ? 'Registrert av Nav i Arbeidssøkerregisteret'
        : 'Brukerens siste svar i Arbeidssøkerregisteret';

    const regDato = arbeidssoekerperiodeStartet ? 'Registrert: ' + formaterDato(arbeidssoekerperiodeStartet) : null;
    const sistOppdatert = sendtInnAv.tidspunkt ? 'Sist oppdatert: ' + formaterDato(sendtInnAv.tidspunkt) : null;

    const sistOppdatertAv = erManuellBruker ? `Sist oppdatert av: ${sendtInnAv.utfoertAv.id}` : null;

    return (
        <Informasjonsbolk header={overskrift} headerTypo="ingress">
            <BodyShort className="registrering_dato" size="small">
                {regDato}
            </BodyShort>
            <BodyShort className="registrering_dato" size="small">
                {sistOppdatert}
            </BodyShort>
            <BodyShort className="registrering_dato" size="small">
                {sistOppdatertAv}
            </BodyShort>
        </Informasjonsbolk>
    );
};
