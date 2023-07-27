import { useState, useEffect, useRef } from 'react';

import { useStateData } from '../proxy/state';
import { delay } from '../config';
import { Elevator, BuildingMin } from '../types/Buildings';
import { playDing } from '../utils/play';

interface UseElevatorControlProps {
    buildings: BuildingMin[];
}

const useElevatorControl = ({ buildings }: UseElevatorControlProps) => {
    const { floorsList, pressedButtonsList } = useStateData();
    const [buildingElevators, setBuildingElevators] = useState<Elevator[][]>([]);
    const working = useRef(false);

    useEffect(() => {
        const initialElevators = buildings.map((building, idx) => {
            floorsList.set(idx, new Set())
            pressedButtonsList.set(idx, new Set())
            const elevators: Elevator[] = Array(+building.numberOfElevators)
                .fill(null)
                .map((_, index) => ({
                    id: index + 1,
                    currentFloor: 0,
                    floorRequests: [],
                    isMoving: false,
                }));

            return elevators;
        });
        setBuildingElevators(initialElevators);
    }, [buildings]);

    const callElevator = (buildingIndex: number, floor: number) => {
        const buildingButtons = floorsList.get(buildingIndex)
        buildingButtons?.add(floor);
        const pressedButtons = pressedButtonsList.get(buildingIndex)
        pressedButtons?.add(floor);
        if (!working.current) {
            working.current = true;
            const delayWhileLoop = () => {
              let size: number = buildingButtons?.size || 0;
      
              const processNext = async () => {
                
                let isAvailableElevators = true;
                setBuildingElevators( prev => {
                    isAvailableElevators = prev[buildingIndex].some(el => !el.isMoving);
                    return prev;
                })
                if (isAvailableElevators) {
                    const next = buildingButtons?.values().next().value;
                    
                    await callNextElevator(buildingIndex, next);
                    buildingButtons?.delete(next);
                    size = buildingButtons?.size || 0;
                }
                if (size > 0) {
                  setTimeout(processNext, 0);
                } else {
                  working.current = false;
                }
              };
              processNext();
            };
      
            delayWhileLoop();
        }
    };

    const callNextElevator = async (buildingIndex: number, floor: number) => {
        const elevators = buildingElevators[buildingIndex];
        let closestElevator = elevators.find(el => !el.isMoving) || elevators[0];

        let closestElevatorDiff = Math.abs(floor - closestElevator.currentFloor);
        for (let i = 0; i < elevators.length; i++) {
            const elevator = elevators[i];

            if (elevator.isMoving) continue;
            const diff = Math.abs(floor - elevator.currentFloor);
            if (
                closestElevatorDiff > diff
            ) {
                closestElevatorDiff = diff;
                closestElevator = elevator;
            }
        }
        closestElevator.floorRequests.push(floor);
        
        if (!closestElevator.isMoving) {
            startElevatorMovement(buildingIndex, closestElevator.id);
        }
    }

    const startElevatorMovement = (buildingIndex: number, elevatorId: number) => {
        const elevators = [...buildingElevators[buildingIndex]];

        const elevatorIndex = elevators.findIndex(
            (elevator) => elevator.id === elevatorId
        );

        if (elevatorIndex !== -1) {
            const updatedElevator = { ...elevators[elevatorIndex], isMoving: true };
            elevators[elevatorIndex] = updatedElevator;

            const updatedBuildingElevators = [...buildingElevators];
            updatedBuildingElevators[buildingIndex] = elevators;
            setBuildingElevators(updatedBuildingElevators);

            simulateElevatorMovement(buildingIndex, elevatorId);
        }
    };

    const simulateElevatorMovement = (buildingIndex: number, elevatorId: number) => {
        const elevators = [...buildingElevators[buildingIndex]];
        const elevatorIndex = elevators.findIndex(
            (elevator) => elevator.id === elevatorId
        );
        
        if (elevatorIndex !== -1) {
            const elevator = elevators[elevatorIndex];

            const nextFloor = elevator.floorRequests.shift();
            if (nextFloor !== undefined && nextFloor !== null) {
                setBuildingElevators(prev => {
                    const prevElevator = prev[buildingIndex][elevatorIndex];
                    const updatedElevator: Elevator = {
                        ...prevElevator,
                        isMoving: true,
                        currentFloor: nextFloor,
                    };
                    const nextElevators = [...elevators]
                    nextElevators[elevatorIndex] = updatedElevator;
                    const updatedBuildingElevators = [...prev];
                    updatedBuildingElevators[buildingIndex] = nextElevators;
                    return updatedBuildingElevators;
                });
                setTimeout(() => {
                    if (elevator.floorRequests.length > 0) {
                        simulateElevatorMovement(buildingIndex, elevatorId);
                    } else {
                        stopElevatorMovement(buildingIndex, elevatorId);
                    }
                }, delay);
            }
        }
    }

    const stopElevatorMovement = (buildingIndex: number, elevatorId: number) => {
        setBuildingElevators(prev => {
            const elevators = [...prev[buildingIndex]];
            const elevatorIndex = elevators.findIndex(
                (elevator) => elevator.id === elevatorId
            );

            if (elevatorIndex !== -1) {
                const updatedElevator = { ...elevators[elevatorIndex], isMoving: false };
                elevators[elevatorIndex] = updatedElevator;
                const updatedBuildingElevators = [...prev];
                updatedBuildingElevators[buildingIndex] = elevators;
                const pressedButtons = pressedButtonsList.get(buildingIndex)
                pressedButtons?.delete(updatedElevator.currentFloor);
                setTimeout(playDing, 0);
                return updatedBuildingElevators;
            }

            return prev;
        });
        
    }

    return { buildingElevators, callElevator };
};

export default useElevatorControl;