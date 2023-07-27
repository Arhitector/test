import Styles from './styles';
import {FloorProps} from './types';

const Floor: React.FC<FloorProps> = ({ floor, pressed, onClick, children }) => {
  return (
    <Styles.Floor>
      <Styles.ElevatorBtn pressed={!!pressed} onClick={() => onClick(floor)} >{floor}</Styles.ElevatorBtn>
      {children}
    </Styles.Floor>
  );
};

export default Floor;