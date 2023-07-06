import '../info.css';
import { StringOrNothing } from '../../utils/felles-typer';

interface Props {
    header: string;
    values?: StringOrNothing[];
    children?: React.ReactNode;
}
export function DobbeltInformasjon(props: Props) {
    return (
        <div className="info_span">
            <span className="tittel">{props.header}:</span>
            <span className='infoboks_container'>
                {props.values?.map((value, index) => (
                    <span key={index} className="undertittel">
                        {value}
                    </span>
                ))}</span>
            {props.children}
        </div>
    );
}


