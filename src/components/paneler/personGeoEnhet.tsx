import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import hentPersonalia from '../../data/api/hentPersonalia';

const PersonGeoEnhet = () => {
  const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

  useEffect(() => {
    hentPersonalia('10108000398').then(data => {
      setPerson(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Geografisk enhet: </dt>
      <dd className='overblikkUndertittel'>{person?.geografiskEnhet?.enhetsnummer} {person?.geografiskEnhet?.navn}</dd>
    </dl>
  );
  
};

export default PersonGeoEnhet;

