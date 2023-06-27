import { useEffect, useState } from 'react';
import hentOppfolging from '../../data/api/hentOppfolging';
import { OppfolgingsstatusData } from '../../data/api/datatyper/oppfolgingsstatus';

const OppfolgingMal = () => {
  const [oppfolging, setOppfolging] = useState<OppfolgingsstatusData | null>(null);

  useEffect(() => {
    hentOppfolging('10108000398').then(data => {
      setOppfolging(data)
    });
  },[]);

  return (
    <dl>
    <dt className='overblikkTittel'>Brukers mål: </dt>
    <dd className='overblikkUndertittel'>{oppfolging?.hovedmaalkode}</dd>
</dl>
  );
  
};

export default OppfolgingMal;

