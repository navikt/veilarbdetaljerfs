import { useEffect, useState } from 'react';
import { PersonaliaV2Info } from '../../data/api/datatyper/personalia';
import hentPersonalia from '../../data/api/hentPersonalia';

const PersonSivilstand = () => {
  const [person, setPerson] = useState<PersonaliaV2Info | null>(null);

  useEffect(() => {
    hentPersonalia('10108000398').then(data => {
      setPerson(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Sivilstatus</dt>
      <dd className='overblikkUndertittel'>{person?.sivilstandliste?.[0]?.sivilstand}</dd>
    </dl>
  );
  
};

export default PersonSivilstand;

