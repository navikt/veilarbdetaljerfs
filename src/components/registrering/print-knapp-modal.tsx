import { Button } from '@navikt/ds-react';
import { trackAmplitude } from '../../amplitude/amplitude';

export function PrintKnappModal() {
    const handleBtnClick = () => {
        trackAmplitude({
            name: 'last ned',
            data: {
                type: 'saksdokument',
                tema: 'personvernsinformasjon',
                tittel: 'Personverninformasjon, rettigheter og plikter'
            }
        });
        window.print();
    };

    return (
        <Button variant="primary" type="button" onClick={handleBtnClick}>
            Skriv ut
        </Button>
    );
}
