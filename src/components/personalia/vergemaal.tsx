import {
    VergeEllerFullmektig,
    VergemaalEllerFremtidsfullmakt,
    Vergemal,
    Vergetype
} from '../../data/api/datatyper/verge';
import { BodyShort } from '@navikt/ds-react';
import { formaterDato, formateStringInUpperAndLowerCase } from '../../utils/formater';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { isNotEmptyArray, isNullOrUndefined } from '../../utils/felles-typer';
import EMDASH from '../../utils/emdash';

function vergetypeBeskrivelse(vergeType: Vergetype) {
    switch (vergeType) {
        case Vergetype.VOKSEN:
            return 'Voksen';
        case Vergetype.MINDREAARIG:
            return 'Mindreårig (unntatt EMF)';
        case Vergetype.MIDLERTIDIG_FOR_VOKSEN:
            return 'Voksen midlertidig';
        case Vergetype.MIDLERTIDIG_FOR_MINDREAARIG:
            return 'Mindreårig midlertidig (unntatt EMF)';
        case Vergetype.STADFESTET_FREMTIDSFULLMAKT:
            return 'Fremtidsfullmakt';
        case Vergetype.ENSLIG_MINDREAARIG_ASYLSOEKER:
            return 'Enslig mindreårig asylsøker';
        case Vergetype.ENSLIG_MINDREAARIG_FLYKTNING:
            return 'Enslig mindreårig flyktning inklusive midlertidige saker for denne gruppen';
        case Vergetype.FORVALTNING_UTENFOR_VERGEMAAL:
            return 'Forvaltning utenfor vergemål';
        default:
            return '';
    }
}

function VergeEllerFullmakt(props: { vergeEllerFullmektig: VergeEllerFullmektig }) {
    const { navn, motpartsPersonident, tjenesteomraade } = props.vergeEllerFullmektig;

    const tjenesteoppgaveString = tjenesteomraade
        .filter((område) => område.tjenestevirksomhet === 'nav')
        .map((område) => område.tjenesteoppgave)
        .join(', ')
        .replace('sosialeTjenester', 'Sosiale tjenester');

    return (
        <div>
            <div className="underinformasjon">
                <BodyShort size="small" className="body_header">
                    Verge
                </BodyShort>
                {navn && (
                    <div>
                        <BodyShort size="small">{`${navn.fornavn} ${navn.mellomnavn || ''} ${
                            navn.etternavn
                        }`}</BodyShort>
                    </div>
                )}
                <BodyShort size="small">{motpartsPersonident}</BodyShort>
            </div>

            {tjenesteomraade && (
                <div className="underinformasjon">
                    <BodyShort size="small" className="body_header">
                        {tjenesteomraade.length > 1 ? 'Tjenesteområder' : 'Tjenesteområde'}
                    </BodyShort>
                    <BodyShort size="small">{formateStringInUpperAndLowerCase(tjenesteoppgaveString)}</BodyShort>
                </div>
            )}
        </div>
    );
}

function Verge(props: { vergemaal: VergemaalEllerFremtidsfullmakt }) {
    const { type, embete, vergeEllerFullmektig, folkeregistermetadata } = props.vergemaal;
    const { gyldighetstidspunkt, opphoerstidspunkt } = folkeregistermetadata;

    if (!isNullOrUndefined(props)) {
        return (
            <div className="underinformasjon">
                <BodyShort size="small">{vergetypeBeskrivelse(type)}</BodyShort>
                <VergeEllerFullmakt vergeEllerFullmektig={vergeEllerFullmektig} />
                <BodyShort size="small" className="body_header">
                    Fylkesmannsembete
                </BodyShort>
                <BodyShort size="small">{embete}</BodyShort>
                <BodyShort size="small" className="typografi_dato">
                    {`${gyldighetstidspunkt && formaterDato(gyldighetstidspunkt)} - ${
                        opphoerstidspunkt ? formaterDato(opphoerstidspunkt) : ''
                    }`}
                </BodyShort>
            </div>
        );
    }
    return null;
}

function Vergemaal(props: Pick<Vergemal, 'vergemaalEllerFremtidsfullmakt'>) {
    const { vergemaalEllerFremtidsfullmakt } = props;

    let vergemaalListe;

    if (isNotEmptyArray(vergemaalEllerFremtidsfullmakt)) {
        vergemaalListe = vergemaalEllerFremtidsfullmakt.map((vergemaal, index) => (
            <Verge vergemaal={vergemaal} key={index} />
        ));
    } else {
        return (
            <Informasjonsbolk header="Verge" headerTypo="ingress">
                {EMDASH}
            </Informasjonsbolk>
        );
    }

    return (
        <Informasjonsbolk header="Vergemål" headerTypo="ingress">
            {vergemaalListe}
        </Informasjonsbolk>
    );
}

export default Vergemaal;
