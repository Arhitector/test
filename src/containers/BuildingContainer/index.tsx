import Building from '../../components/Building';
import Elevators from '../../components/Elevators';
import Elevator from '../../components/Elevator';
import useElevatorControl from '../../hooks/useElevatorControl';
import { useStateData } from '../../proxy/state';

import Styles from './styles';

const BuildingContainer: React.FC = () => {
  const { state, pressedButtonsList } = useStateData();
  const { buildingElevators, callElevator } = useElevatorControl({buildings: state});

  const handleCallElevator = (idx: number) => (floor: number) => {
    callElevator(idx, floor);
  }

  return (
    <Styles.Buildings>
    {
      state.map((building, idx) =>
        <Building
          key={idx}
          pressedButtons={pressedButtonsList.get(idx)}
          floorsAmount={building.numberOfFloors}
          handleCallElevator={handleCallElevator(idx)}
          size={buildingElevators[idx]?.length}
        >
            <Elevators>
                {(buildingElevators[idx] || []).map(el => <Elevator key={el.id} floor={el.currentFloor} />)}
            </Elevators>
        </Building>
      )
    }
    </Styles.Buildings>
  );
};

export default BuildingContainer;