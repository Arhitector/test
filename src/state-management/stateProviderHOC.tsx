import { ReactNode, createContext, useState } from "react";
import { BuildingMin as BuildingType } from '../types/Buildings';

type PressedButtonsList = Map<number, Set<number>>;

export interface useStateManagerProps {
  state: BuildingType[];
  setState: (val: BuildingType[]) => void;
  floorsList: PressedButtonsList;
  pressedButtonsList: PressedButtonsList;
}

export const StateContext = createContext<useStateManagerProps>({
  state: [],
  setState: () => [],
  floorsList: new Map(),
  pressedButtonsList: new Map(),
});

interface StateProviderProps {
  children: ReactNode;
}

export function StateProviderHOC({ children }: StateProviderProps) {
    const [state, setState] = useState<BuildingType[]>([]);

    const floorsList = new Map();
    const pressedButtonsList = new Map();
    return (
      <StateContext.Provider value={{state, setState, floorsList, pressedButtonsList}}>
            {children}
      </StateContext.Provider>
    );
  }