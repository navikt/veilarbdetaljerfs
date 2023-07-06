import '../info.css';
import { StringOrNothing } from '../../utils/felles-typer';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon(props: Props) {
    return (
        <span className='info_span'>
            <span className="tittel">{props.header}:</span>
            <span className="undertittel">{props?.value}</span>
        </span>
    );
}
