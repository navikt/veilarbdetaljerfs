import { Button } from '@navikt/ds-react';
import './registrering.css';
import { trackAmplitude } from '../../amplitude/amplitude';

export function PrintKnappModal() {
    trackAmplitude({
        name: 'last ned',
        data: {
            type: 'saksdokument',
            tema: 'personvernsinformasjon',
            tittel: 'Personverninformasjon, rettigheter og plikter'
        }
    });
    const printModal = () => {
        const modalWrapper = document.getElementById('modal-a11y-wrapper');
        if (modalWrapper) {
            modalWrapper.style.display = 'none';
            window.print();
            modalWrapper.style.display = 'block';
        }
    };

    return (
        <div className="personvern_modal_header">
            <Button variant="primary" type="button" onClick={printModal}>
                Skriv ut
            </Button>
        </div>
    );
}
