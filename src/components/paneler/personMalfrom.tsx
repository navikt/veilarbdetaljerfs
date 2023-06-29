import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import { hentPersonalia } from '../../data/api/fetch';

const PersonMalform = () => {
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

    useEffect(() => {
        hentPersonalia('10108000398').then((data) => {
            setPerson(data);
        });
    }, []);

    return (
        <div>
            <h3>Språk: </h3>
            <p>{person?.malform}</p>
        </div>
    );
};

export default PersonMalform;
