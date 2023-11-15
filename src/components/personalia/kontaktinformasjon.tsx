import {
    Bostedsadresse,
    Kontaktadresse,
    Oppholdsadresse,
    PersonaliaEpost,
    PersonaliaTelefon
} from '../../data/api/datatyper/personalia';
import { usePersonalia } from '../../data/api/fetch';
import { useAppStore } from '../../stores/app-store';
import { OrNothing } from '../../utils/felles-typer';
import Informasjonsbolk from '../felles/informasjonsbolk';
import Adresser from './adresser';
import Epost from './e-post';
import Telefon from './telefon';

const Kontaktinformasjon = () => {
    const { fnr } = useAppStore();
    const behandlingsnummer = 'B640';

    const person = usePersonalia(fnr, behandlingsnummer);

    const telefon: PersonaliaTelefon[] = person.data?.telefon ?? [];
    const epost: OrNothing<PersonaliaEpost> = person.data?.epost;
    const bostedsadresse: OrNothing<Bostedsadresse> = person.data?.bostedsadresse;
    const oppholdsadresse: OrNothing<Oppholdsadresse> = person.data?.oppholdsadresse;
    const kontaktadresser: Kontaktadresse[] = person.data?.kontaktadresser ?? [];

    return (
        <Informasjonsbolk header="Kontaktinformasjon" headerTypo="ingress">
            <Telefon telefon={telefon} />
            <Epost epost={epost} />
            <Adresser
                bostedsadresse={bostedsadresse}
                oppholdsadresse={oppholdsadresse}
                kontaktadresser={kontaktadresser}
            />
        </Informasjonsbolk>
    );
};
export default Kontaktinformasjon;
