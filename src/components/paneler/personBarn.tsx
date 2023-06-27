import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import hentPersonalia from '../../data/api/hentPersonalia';

const PersonBarn = () => {
  const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

  useEffect(() => {
    hentPersonalia('10108000398').then(data => {
      setPerson(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Barn fødselsdato </dt>
      <dd className='overblikkUndertittel'>{person?.barn?.[0]?.fodselsdato}</dd>
    </dl>
  );
  
};

export default PersonBarn;

