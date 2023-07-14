import {
    Vergetype,
    VergeOgFullmaktData,
    VergeEllerFullmektig,
    VergemaalEllerFremtidsfullmakt,
    VergemaalEllerFullmaktOmfangType
} from '../../data/api/datatyper/vergeOgFullmakt';
import { BodyShort } from '@navikt/ds-react';
import { formaterDato, isNotEmptyArray } from '../../utils/formater';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { isNullOrUndefined } from '../../utils/felles-typer';
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

function vergeEllerFullmaktOmfangBeskrivelse(omfangType: VergemaalEllerFullmaktOmfangType) {
    switch (omfangType) {
        case VergemaalEllerFullmaktOmfangType.UTLENDINGSSAKER:
            return 'Ivareta personens interesser innenfor det personlige og økonomiske området herunder utlendingssaken (kun for EMA)';
        case VergemaalEllerFullmaktOmfangType.PERSONLIGE_INTERESSER:
            return 'Ivareta personens interesser innenfor det personlige området';
        case VergemaalEllerFullmaktOmfangType.OEKONOMISKE_INTERESSER:
            return 'Ivareta personens interesser innenfor det økonomiske området';
        case VergemaalEllerFullmaktOmfangType.PERSONLIGE_OG_OEKONOMISKE_INTERESSER:
            return 'Ivareta personens interesser innenfor det personlige og økonomiske området';
        default:
            return '';
    }
}

function VergeEllerFullmakt(props: { vergeEllerFullmektig: VergeEllerFullmektig }) {
    const { navn, motpartsPersonident, omfang } = props.vergeEllerFullmektig;

    return (
        <div className="PersonaliaVerge">
            <div>
                <BodyShort size="small" className="BodyHeader">
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
            <div>
                <BodyShort size="small">Omfang</BodyShort>
                <BodyShort size="small">{vergeEllerFullmaktOmfangBeskrivelse(omfang)}</BodyShort>
            </div>
        </div>
    );
}

function Verge(props: { vergemaal: VergemaalEllerFremtidsfullmakt }) {
    const { type, embete, vergeEllerFullmektig, folkeregistermetadata } = props.vergemaal;
    const { ajourholdstidspunkt, gyldighetstidspunkt } = folkeregistermetadata;

    if (!isNullOrUndefined(props)) {
        return (
            <div className="PersonaliaVerge">
                <BodyShort size="small">{vergetypeBeskrivelse(type)}</BodyShort>
                <VergeEllerFullmakt vergeEllerFullmektig={vergeEllerFullmektig} />
                <BodyShort size="small" className="BodyHeader">
                    Fylkesmannsembete
                </BodyShort>
                <BodyShort size="small">{embete}</BodyShort>
                <BodyShort size="small">
                    {`${ajourholdstidspunkt && formaterDato(ajourholdstidspunkt)} - ${
                        gyldighetstidspunkt ? formaterDato(gyldighetstidspunkt) : ''
                    }`}
                </BodyShort>
            </div>
        );
    }
    return null;
}

function Vergemaal(props: Pick<VergeOgFullmaktData, 'vergemaalEllerFremtidsfullmakt'>) {
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
        <Informasjonsbolk header="Bruker er under vergemål" headerTypo="ingress">
            {vergemaalListe}
        </Informasjonsbolk>
    );
}

export default Vergemaal;
