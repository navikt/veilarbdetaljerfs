import { useEffect, useState } from 'react';
import hentRegistrering from '../../data/api/hentRegistrering';
import { RegistreringsData } from '../../data/api/datatyper/registreringsData';

const RegistrertAv = () => {
  const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);

  useEffect(() => {
    hentRegistrering('10108000398').then(data => {
      setRegistrering(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Registrert av </dt>
      <dd className='overblikkUndertittel'>{registrering?.registrering?.manueltRegistrertAv?.enhet?.navn}</dd>
    </dl>
  );
  
};

export default RegistrertAv;

