import { useEffect, useState } from 'react';
import hentTolk from '../../data/api/hentTolk';
import { TilrettelagtKommunikasjonData } from '../../data/api/datatyper/tilrettelagtKommunikasjon';

const Tolk = () => {
  const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);

  useEffect(() => {
    hentTolk('10108000398').then(data => {
      setTolk(data)
    });
  },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Tilrettelagt kommunikasjon</dt>
      <dd className='overblikkUndertittel'>{tolk?.talespraak}</dd>
    </dl>
  );
  
};

export default Tolk;

