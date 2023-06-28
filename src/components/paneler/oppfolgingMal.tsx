import { useEffect, useState } from 'react';
import hentOppfolging from '../../data/api/hentOppfolging';
import { OppfolgingsstatusData } from '../../data/api/datatyper/oppfolgingsstatus';

const OppfolgingMal = () => {
    const [oppfolging, setOppfolging] = useState<OppfolgingsstatusData | null>(null);

    useEffect(() => {
        hentOppfolging('10108000398').then((data) => {
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
