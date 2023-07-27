import { useContext } from "react";
import { StateContext, useStateManagerProps } from "./stateProviderHOC";

export const useStateManager = (): useStateManagerProps => {
  const data = useContext(StateContext);
  return data;
};
