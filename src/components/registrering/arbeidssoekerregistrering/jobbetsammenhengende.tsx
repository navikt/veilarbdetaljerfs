import { BodyShort, Label } from '@navikt/ds-react';
import Informasjonsbolk from '../../felles/informasjonsbolk.tsx';
import { Profilering } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    profilering: Profilering;
}

export const JobbetSammenhengende = ({ profilering }: Props) => (
    <Informasjonsbolk header="Hentet fra Aa-registeret" headerTypo="ingress">
        <Label size="small" as="p">
            Brukeren har vært sammenhengende i jobb minst 6 av de siste 12 måneder
        </Label>
        <BodyShort size="small">{profilering.jobbetSammenhengendeSeksAvTolvSisteManeder ? 'Ja' : 'Nei'}</BodyShort>
    </Informasjonsbolk>
);
