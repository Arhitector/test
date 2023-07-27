import styled from 'styled-components';

import {floorSize, windowColor} from '../../config';

interface BuildingProps {
    size: number;
}

const Building  = styled.div<BuildingProps>`
    width: ${props => props.size * (floorSize *3/2) + 30}px;
    min-width: 120px;
    ul {
        list-style: none;
        padding: 0 0 0 30px;
        margin: 0;
    }
`;

const Door = styled.div`
    position: absolute;
    left: 12px;
    bottom: 0;
    z-index: 1;
    width: ${floorSize/3*2}px;
    height: 80%;
    background-color: ${windowColor};
    box-shadow: 0px -1px 0px 1px rgba(0, 0, 0, 0.8);
    &:after {
        content: '';
        display: block;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: #000;
        position: absolute;
        right: 2px;
        top: 50%;
    }
`;

export default {
    Building,
    Door
};