import { ReactNode } from 'react';

export interface BuildingProps {
    children: ReactNode,
    handleCallElevator: (key: number) => void;
    floorsAmount: number;
    pressedButtons: Set<number> | undefined;
    size: number;
}