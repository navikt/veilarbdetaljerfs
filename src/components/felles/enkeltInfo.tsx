import '../nokkelinfo.css';
import { StringOrNothing } from '../../utils/felles-typer';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon(props: Props) {
    return (
        <span className='EnkeltinformasjonSpan'>
            <span className="nokkelinfoTittel">{props.header}:</span>
            <span className="nokkelinfoUndertittel">{props?.value}</span>
        </span>
    );
}
