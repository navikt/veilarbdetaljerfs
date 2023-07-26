import { PersonChatIcon } from '@navikt/aksel-icons';
import {
    Bostedsadresse,
    Kontaktadresse,
    Oppholdsadresse,
    PersonaliaTelefon
} from '../../data/api/datatyper/personalia';
import { usePersonalia } from '../../data/api/fetch';
import { useAppStore } from '../../stores/app-store';
import { OrNothing } from '../../utils/felles-typer';
import Informasjonsbolk from '../felles/informasjonsbolk';
import Adresser from './adresser';
import Telefon from './telefon';

const Kontaktinformasjon = () => {
    const { fnr } = useAppStore();

    const person = usePersonalia(fnr);

    const bostedsadresse: OrNothing<Bostedsadresse> = person.data?.bostedsadresse;
    const telefon: PersonaliaTelefon[] = person.data?.telefon!;
    const oppholdsadresse: OrNothing<Oppholdsadresse> = person.data?.oppholdsadresse;
    const kontaktadresser: Kontaktadresse[] = person.data?.kontaktadresser ?? [];

    return (
        <Informasjonsbolk
            header="Kontaktinformasjon"
            headerTypo="ingress"
            icon={<PersonChatIcon title="a11y-title" aria-hidden="true" />}
        >
            <Telefon telefon={telefon} />
            <Adresser
                bostedsadresse={bostedsadresse}
                oppholdsadresse={oppholdsadresse}
                kontaktadresser={kontaktadresser}
            />
        </Informasjonsbolk>
    );
};
export default Kontaktinformasjon;
