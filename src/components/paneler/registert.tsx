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
    <div>
        <h3>Registrert: </h3>
        <p>{registrering?.registrering?.opprettetDato}</p>
        </div>
  );
  
};

export default Registrert;

