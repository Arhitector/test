import Floor from '../Floor';

import Styles from './styles';
import {BuildingProps} from './types'

const  Building: React.FC<BuildingProps> = ({children, handleCallElevator, floorsAmount, pressedButtons, size}) => {
    return <Styles.Building size={size}>
        <ul>
            {[...Array(floorsAmount).keys()].map(el => 
                <Floor key={el} pressed={pressedButtons?.has(floorsAmount - el)} floor={floorsAmount - el}  onClick={handleCallElevator} />
            )}
            <Floor floor={0} pressed={pressedButtons?.has(0)} onClick={handleCallElevator} >
                <Styles.Door />
                {children}
            </Floor>
        </ul>
    </Styles.Building>
}

export default Building;