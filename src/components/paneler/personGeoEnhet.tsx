import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import hentPersonalia from '../../data/api/hentPersonalia';

const PersonGeoEnhet = () => {
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

    useEffect(() => {
        hentPersonalia('10108000398').then(data => {
            setPerson(data)
        });
    },[]);

    return (
        <div>
            <h3>Geografisk enhet: </h3>
            <p>{person?.geografiskEnhet?.enhetsnummer} {person?.geografiskEnhet?.navn}</p>
        </div>
    );

};

export default PersonGeoEnhet;