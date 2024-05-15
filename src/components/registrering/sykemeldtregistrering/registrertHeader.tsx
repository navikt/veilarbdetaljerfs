import { BodyShort } from '@navikt/ds-react';
import { Registrering } from '../../../data/api/datatyper/registreringsData.ts';
import { formaterDato } from '../../../utils/formater.ts';
import Informasjonsbolk from '../../felles/informasjonsbolk.tsx';

export const RegistrertHeader = (props: { registrering?: Registrering }) => {
    if (!props.registrering) {
        return null;
    }

    const overskrift = props.registrering.manueltRegistrertAv
        ? 'Registrert av NAV'
        : 'Brukerens svar fra registreringen';

    const regDato = props.registrering.opprettetDato
        ? 'Registrert: ' + formaterDato(props.registrering.opprettetDato)
        : null;

    const enhetNavn = props.registrering.manueltRegistrertAv?.enhet?.navn;
    const enhetID = props.registrering.manueltRegistrertAv?.enhet?.id;
    const ident = props.registrering?.manueltRegistrertAv?.ident;

    const registrertAv = props.registrering?.manueltRegistrertAv?.enhet
        ? `Registrert av: ${ident}, ${enhetID} ${enhetNavn}`
        : `Registrert av: ${ident}`;

    const erRegistrert = props.registrering?.manueltRegistrertAv ? registrertAv : null;

    return (
        <Informasjonsbolk header={overskrift} headerTypo="ingress">
            <BodyShort className="registrering_dato" size="small">
                {regDato}
            </BodyShort>
            <BodyShort className="registrering_dato" size="small">
                {erRegistrert}
            </BodyShort>
        </Informasjonsbolk>
    );
};
