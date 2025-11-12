import { useEffect, useState } from 'react';
import { Button } from '@navikt/ds-react';
import { ChevronRightLastIcon } from '@navikt/aksel-icons';
import './til-toppen-knapp.css';

const TilToppenKnapp = () => {
    const [synlig, setSynlig] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => setSynlig(window.scrollY > 450));
    });

    return (
        <>
            {synlig && (
                <Button
                    variant="secondary"
                    icon={<ChevronRightLastIcon />}
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                    id="til-toppen-knapp"
                ></Button>
            )}
        </>
    );
};

export default TilToppenKnapp;
