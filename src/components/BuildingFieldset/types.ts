import { FieldErrors, Control, FieldValues } from "react-hook-form";
import { BuildingMin as BuildingType } from "../../types/Buildings";
import { FormData } from "../../containers/ConfigContainer/types";

export interface BuildingFieldsetProps {
    building: BuildingType;
    control: Control<FormData, FieldValues>;
    errors?: FieldErrors<FormData>;
    handleDestroy: () => void;
}