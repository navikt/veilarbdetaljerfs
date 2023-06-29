import { useEffect, useState } from 'react';
import { hentTolk } from '../../data/api/fetch';
import { TilrettelagtKommunikasjonData } from '../../data/api/datatyper/tilrettelagtKommunikasjon';

const Tolk = () => {
    const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);

    useEffect(() => {
        hentTolk('10108000398').then((data) => {
            setTolk(data);
        });
    }, []);

    return (
        <div>
            <h3>Tilrettelagt kommunikasjon</h3>
            <p>{tolk?.talespraak}</p>
        </div>
    );
};

export default Tolk;
