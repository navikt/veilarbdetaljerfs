import '../nokkelinfo.css';
import { StringOrNothing } from '../../utils/felles-typer';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon(props: Props) {
    return (
        <span className='enkeltinformasjon_span'>
            <span className="nokkelinfo_tittel">{props.header}:</span>
            <span className="nokkelinfo_undertittel">{props?.value}</span>
        </span>
    );
}
