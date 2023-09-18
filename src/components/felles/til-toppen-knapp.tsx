import { useEffect, useState } from 'react';
import { Button } from '@navikt/ds-react';
import { ChevronRightLastIcon } from '@navikt/aksel-icons';
import './til-toppen-knapp.css';
import { trackAmplitude } from '../../amplitude/amplitude';

const TilToppenKnapp = () => {
    const [synlig, setSynlig] = useState(false);

    const synlighet = () => {
        window.scrollY > 450 ? setSynlig(true) : setSynlig(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', synlighet);
    });

    return (
        <>
            {synlig && (
                <Button
                    variant="secondary"
                    icon={<ChevronRightLastIcon />}
                    onClick={() => {
                        window.scrollTo(0, 0);
                        trackAmplitude({
                            name: 'navigere',
                            data: { lenketekst: 'Til toppen knapp', destinasjon: 'Til toppen av siden' }
                        });
                    }}
                    id="til-toppen-knapp"
                ></Button>
            )}
        </>
    );
};

export default TilToppenKnapp;
