import {
    VergeEllerFullmektig,
    VergemaalEllerFremtidsfullmakt,
    VergemaalEllerFullmaktOmfangType,
    VergemaalEllerFullmaktTjenesteoppaveType,
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

function vergeEllerfullmaktTjenesteomraadeBeskrivelse(tjenesteomraade: VergemaalEllerFullmaktTjenesteoppaveType) {
    switch (tjenesteomraade) {
        case VergemaalEllerFullmaktTjenesteoppaveType.FAMILIE:
            return 'Familie';
        case VergemaalEllerFullmaktTjenesteoppaveType.ARBEID:
            return 'Arbeid';
        case VergemaalEllerFullmaktTjenesteoppaveType.HJELPEMIDLER:
            return 'Hjelpemidler';
        case VergemaalEllerFullmaktTjenesteoppaveType.PENSJON:
            return 'Pensjon';
        case VergemaalEllerFullmaktTjenesteoppaveType.SOSIALE_TJENESTER:
            return 'Sosiale tjenester';
        default:
            return '';
    }
}

function VergeEllerFullmakt(props: { vergeEllerFullmektig: VergeEllerFullmektig }) {
    const { navn, motpartsPersonident, omfang, tjenesteomraade } = props.vergeEllerFullmektig;

    const tjenesteoppgaveString = tjenesteomraade
        .map((område) => vergeEllerfullmaktTjenesteomraadeBeskrivelse(område.tjenesteoppgave))
        .join(', ');

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

            {omfang && (
                <div className="underinformasjon">
                    <BodyShort size="small" className="body_header">
                        Omfang
                    </BodyShort>
                    <BodyShort size="small">{vergeEllerFullmaktOmfangBeskrivelse(omfang)}</BodyShort>
                </div>
            )}

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
        <Informasjonsbolk header="Bruker er under vergemål" headerTypo="ingress">
            {vergemaalListe}
        </Informasjonsbolk>
    );
}

export default Vergemaal;
