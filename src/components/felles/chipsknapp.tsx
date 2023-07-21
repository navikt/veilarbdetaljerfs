import { logChips } from '../../utils/logger';
import { TrashIcon, BookmarkIcon, CheckmarkIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

export const LagreChips = (props: { aktiveChips: string[]; lagret: string[] }) => {
    if (props.lagret !== props.aktiveChips) {
        return (
            <Button
                onClick={() => logChips(props.aktiveChips)}
                size="small"
                variant="secondary"
                icon={<BookmarkIcon title="a11y-title" />}
            >
                Lagre visning
            </Button>
        );
    } else {
        return (
            <Button disabled={true} size="small" variant="secondary" icon={<CheckmarkIcon title="a11y-title" />}>
                Lagret
            </Button>
        );
    }
};

export const NullstillChips = (props: {
    alleChips: string[];
    setState: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    return (
        <Button
            onClick={() => props.setState(props.alleChips)}
            size="small"
            variant="tertiary"
            icon={<TrashIcon title="a11y-title" />}
        >
            Nullstill visning
        </Button>
    );
};
