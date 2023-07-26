import { ReactNode } from 'react';

interface ShowProps {
    if?: boolean;
    children?: ReactNode;
}

const Show: React.FC<ShowProps> = ({ if: condition, children }) => {
    return condition ? <>{children}</> : null;
};

export default Show;
