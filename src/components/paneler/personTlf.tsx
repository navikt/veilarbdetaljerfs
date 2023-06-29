import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import { hentPersonalia } from '../../data/api/fetch';

const PersonTlf = () => {
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

    useEffect(() => {
        hentPersonalia('10108000398').then((data) => {
            setPerson(data);
        });
    }, []);

    return (
        <div>
            <h3>Telefon: </h3>
            <p>{person?.telefon?.[0]?.telefonNr}</p>
        </div>
    );
};

export default PersonTlf;
