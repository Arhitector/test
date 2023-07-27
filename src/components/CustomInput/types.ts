import { Control, FieldValues } from "react-hook-form";
import { FormData } from "../../containers/ConfigContainer/types";

export interface InputCustomProps {
    control: Control<FormData, FieldValues>;
    name: string;
    label?: string;
    validation?: Record<string, unknown | Record<string, unknown>>
    defaultValue: number;
    error?: string | undefined;
    other: Record<string, unknown>
}