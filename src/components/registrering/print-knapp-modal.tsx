import { Button } from '@navikt/ds-react';

import './reg.css';

export function PrintKnappModal() {
    const printModal = () => {
        document.getElementById('modal-a11y-wrapper')!.style.display = 'none';
        window.print();
        document.getElementById('modal-a11y-wrapper')!.style.display = 'block';
    };

    return (
        <div className="personvern_modal_header">
            <Button variant="primary" type="button" onClick={printModal}>
                Skriv ut
            </Button>
        </div>
    );
}
