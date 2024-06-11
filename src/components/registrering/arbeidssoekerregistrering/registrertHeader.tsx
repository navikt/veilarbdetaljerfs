import { BodyShort } from '@navikt/ds-react';
import { formaterDato } from '../../../utils/formater';
import Informasjonsbolk from '../../felles/informasjonsbolk';
import { SendtInnAv } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    sendtInnAv: SendtInnAv;
}
export const RegistrertHeader = ({ sendtInnAv }: Props) => {
    const erManuellBruker = sendtInnAv.utfoertAv.type === 'VEILEDER';

    const overskrift = erManuellBruker ? 'Registrert av NAV' : 'Brukerens siste svar fra registreringen';

    const regDato = sendtInnAv.tidspunkt ? 'Sist oppdatert: ' + formaterDato(sendtInnAv.tidspunkt) : null;

    const registrertAv = erManuellBruker ? `Sist oppdatert av: ${sendtInnAv.utfoertAv.id}` : null;

    return (
        <Informasjonsbolk header={overskrift} headerTypo="ingress">
            <BodyShort className="registrering_dato" size="small">
                {regDato}
            </BodyShort>
            <BodyShort className="registrering_dato" size="small">
                {registrertAv}
            </BodyShort>
        </Informasjonsbolk>
    );
};
