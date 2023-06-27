import { useEffect, useState } from 'react';
import hentRegistrering from '../../data/api/hentRegistrering';
import { RegistreringsData } from '../../data/api/datatyper/registreringsData';

const Registrert = () => {
  const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);

  useEffect(() => {
    hentRegistrering('10108000398').then(data => {
      setRegistrering(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Registrert </dt>
      <dd className='overblikkUndertittel'>{registrering?.registrering?.opprettetDato}</dd>
    </dl>
  );
  
};

export default Registrert;

