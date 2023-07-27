import { FieldValues } from "react-hook-form";
import { BuildingMin as BuildingType } from '../../types/Buildings';

export interface FormData extends FieldValues {
    buildings: BuildingType[];
}