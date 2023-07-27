import styled from 'styled-components';

import {floorSize, windowColor} from '../../config';

const Floor =  styled.li`
    position: relative;
    width: 100%;
    height: ${floorSize}px;
    border: 1px solid #ccc;
    background-color: ${windowColor};
    display: flex;
    align-items: center;
    box-sizing: content-box;
    background-image:
        linear-gradient(#82959b ${floorSize/3}px, transparent ${floorSize/3}px),
        linear-gradient(to right, #82959b ${floorSize/3}px, transparent ${floorSize/3}px);
    background-size: ${floorSize/3*2}px ${floorSize/3*2}px;
    span {
        position: absolute;
        top: 50%;
        left: -24px;
        transform: translateY(-50%);
    }
`;

interface ElevatorBtnProps {
    pressed: boolean;
}

const ElevatorBtn = styled.span<ElevatorBtnProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    background-color: ${props => props.pressed ? 'red' : 'green'};
    position: relative;
    cursor: pointer;
`;

export default {
    Floor,
    ElevatorBtn,
}