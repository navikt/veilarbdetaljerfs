import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import { hentPersonalia } from '../../data/api/fetch';

const PersonSivilstand = () => {
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

    useEffect(() => {
        hentPersonalia('10108000398').then((data) => {
            setPerson(data);
        });
    }, []);

    return (
        <div>
            <h3>Sivilstatus: </h3>
            <p>{person?.sivilstandliste?.[0]?.sivilstand}</p>
        </div>
    );
};

export default PersonSivilstand;
