import { useEffect, useState } from 'react';
import hentYtelser from '../../data/api/hentYtelser';
import { YtelseData } from '../../data/api/datatyper/ytelse';

const Ytelser = () => {
  const [ytelser, setYtelser] = useState<YtelseData | null>(null);

    useEffect(() => {
      hentYtelser('10108000398').then(data => {
        setYtelser(data)
      });
    },[]);

  return (
    <dl>
      <dt className='overblikkTittel'>Ytelse(r): </dt>
      <dd className='overblikkUndertittel'>{ytelser?.vedtaksliste?.[0]?.aktivitetsfase}</dd>
    </dl>
  );
  
};

export default Ytelser;

