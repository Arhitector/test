import Styles from './styles';
import elevator from './media/elevator.png'

import {ElevatorProps} from './types';

const Elevator: React.FC<ElevatorProps> = ({floor}) => {
    return <Styles.Elevator floor={floor} ><img src={elevator} alt="elevator" /></Styles.Elevator>
}

export default Elevator;