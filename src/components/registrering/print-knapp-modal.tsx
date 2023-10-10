import { Button } from '@navikt/ds-react';
import './registrering.css';
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
        <div className="personvern_modal_header">
            <Button variant="primary" type="button" onClick={handleBtnClick}>
                Skriv ut
            </Button>
        </div>
    );
}
