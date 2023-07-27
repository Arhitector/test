import { useStateManager } from '../state-management/stateManager';
import { StateProviderHOC } from '../state-management/stateProviderHOC';

export const Provider = StateProviderHOC;
export const useStateData = useStateManager;