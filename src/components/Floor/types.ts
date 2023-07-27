import { ReactNode } from 'react';

export interface FloorProps {
    children?: ReactNode;
    floor: number;
    pressed: boolean | undefined;
    onClick: (floor: number) => void;
  }