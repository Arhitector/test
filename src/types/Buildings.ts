export interface Building {
    id: number;
    numberOfElevators: number;
    numberOfFloors: number;
    elevators: Elevator[];
  }

export type BuildingMin =  Omit<Building, 'elevators' >;
  
export interface Elevator {
    id: number;
    currentFloor: number;
    floorRequests: number[];
    isMoving: boolean;
  }