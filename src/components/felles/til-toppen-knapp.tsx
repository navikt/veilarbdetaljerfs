import { useEffect, useState } from 'react';
import { Button } from '@navikt/ds-react';
import { ChevronRightLastIcon } from '@navikt/aksel-icons';
import './til-toppen-knapp.css';

const scrollTilElement = () => {
    document.querySelector('#veilarbpersonflatefs-root')!.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    });
};

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
                    onClick={scrollTilElement}
                    id="til-toppen-knapp"
                ></Button>
            )}
        </>
    );
};

export default TilToppenKnapp;
