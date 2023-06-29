import { useEffect, useState } from 'react';
import { hentOppfolgingsstatus } from '../../data/api/fetch';
import { OppfolgingsstatusData } from '../../data/api/datatyper/oppfolgingsstatus';

const OppfolgingMal = () => {
    const [oppfolging, setOppfolging] = useState<OppfolgingsstatusData | null>(null);

    useEffect(() => {
        hentOppfolgingsstatus('10108000398').then((data) => {
            setOppfolging(data);
        });
    }, []);

    return (
        <div>
            <h3>Brukers mål: </h3>
            <p>{oppfolging?.hovedmaalkode}</p>
        </div>
    );
};

export default OppfolgingMal;
