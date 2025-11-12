import { Button } from '@navikt/ds-react';

export function PrintKnappModal() {
    const handleBtnClick = () => {
        window.print();
    };

    return (
        <Button variant="primary" type="button" onClick={handleBtnClick}>
            Skriv ut
        </Button>
    );
}
