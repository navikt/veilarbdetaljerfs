import { useEffect, useState } from 'react';
import hentOppfolging from '../../data/api/hentOppfolging';
import { OppfolgingsstatusData } from '../../data/api/datatyper/oppfolgingsstatus';

const OppfolgingEnhet = () => {
    const [oppfolging, setOppfolging] = useState<OppfolgingsstatusData | null>(null);

    useEffect(() => {
        hentOppfolging('10108000398').then((data) => {
            setOppfolging(data);
        });
    }, []);

    return (
        <div>
            <h3>Oppfølgingsenhet: </h3>
            <p>
                {oppfolging?.oppfolgingsenhet?.enhetId} {oppfolging?.oppfolgingsenhet?.navn}
            </p>
        </div>
    );
};

export default OppfolgingEnhet;
