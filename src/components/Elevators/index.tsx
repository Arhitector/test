import Styles from './styles';
import {ElevatorProps} from './types';

const Elevators: React.FC<ElevatorProps> = ({children}) => {
    return <Styles.Elevators>
        {children}
    </Styles.Elevators>
}

export default Elevators;