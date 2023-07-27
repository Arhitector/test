import styled from 'styled-components';

import { floorSize, delay  } from '../../config';

const Elevator = styled.div`
    height: ${floorSize}px;

    transform: translateY(-${(props: { floor: number }) => (props.floor || 0) * (floorSize + 2)}px);
    transition: transform ${delay}ms ease-in-out;
    img {
        object-fit: contain;
        max-height: 100%;
    }
`;

export default {
    Elevator
}