import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import hentPersonalia from '../../data/api/hentPersonalia';

const PersonTlf = () => {
  const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

  useEffect(() => {
    hentPersonalia('10108000398').then(data => {
      setPerson(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Telefon </dt>
      <dd className='overblikkUndertittel'>{person?.telefon?.[0]?.telefonNr}</dd>
    </dl>
  );
  
};

export default PersonTlf;

