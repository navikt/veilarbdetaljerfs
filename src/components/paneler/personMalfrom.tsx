import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import hentPersonalia from '../../data/api/hentPersonalia';

const PersonMalform = () => {
  const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

  useEffect(() => {
    hentPersonalia('10108000398').then(data => {
      setPerson(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Språk </dt>
      <dd className='overblikkUndertittel'>{person?.malform}</dd>
    </dl>
  );
  
};

export default PersonMalform;

