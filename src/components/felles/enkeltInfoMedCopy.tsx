import { BodyShort, CopyButton } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import '../fellesStyling.css';

interface Props {
    header: string;
    value?: StringOrNothing;
}

// export function EnkeltInformasjonMedCopy({ header, value = EMDASH }: Props) {
//     return (
//         <span>
//             <BodyShort size="small" className="copyHeader">
//                 {header}
//             </BodyShort>
//             <span className="copyBody">
//                 <BodyShort size="small">{value}</BodyShort>
//                 <CopyButton copyText={value!} />
//             </span>
//         </span>
//     );
// }

export function EnkeltInformasjonMedCopy({ header, value = EMDASH }: Props) {
    const showCopyButton = value !== EMDASH;
    return (
        <span>
            <BodyShort size="small" className="copyHeader">
                {header}
            </BodyShort>
            <span className={`copyBody ${showCopyButton ? 'withoutEMDASH' : 'withEMDASH'}`}>
                <BodyShort size="small">{value}</BodyShort>
                {showCopyButton && <CopyButton copyText={value!} />}
            </span>
        </span>
    );
}
