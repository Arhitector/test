import { Button } from "theme-ui";
import InputCustom from "../CustomInput";
import { validationFloor, validationElevator } from "./validation";

import Styles from './styles';
import { BuildingFieldsetProps } from "./types";


const BuildingFieldset: React.FC<BuildingFieldsetProps> = ({
    building,
    control,
    errors,
    handleDestroy,
}) => {
    return (
        <Styles.Fieldset>
            <legend>Skyscraper № {building.id + 1}</legend>
            <InputCustom
                control={control}
                name={`buildings[${building.id}].id`}
                defaultValue={building.id}
                other={{
                    type: "hidden",
                }}
            />
            <InputCustom
                control={control}
                name={`buildings[${building.id}].numberOfFloors`}
                label="Amount of floors"
                validation={validationFloor}
                defaultValue={building.numberOfFloors}
                error={errors?.buildings?.[building.id]?.numberOfFloors?.message}
                other={{
                    type: "number",
                    mb: 3,
                }}
            />
            <InputCustom
                control={control}
                name={`buildings[${building.id}].numberOfElevators`}
                label="Amount of elevators"
                validation={validationElevator}
                defaultValue={building.numberOfElevators}
                error={errors?.buildings?.[building.id]?.numberOfElevators?.message}
                other={{
                    type: "number",
                    mb: 3,
                }}
            />
            <Button mb={2} variant="muted" onClick={handleDestroy}>
                Destroy Building
            </Button>
        </Styles.Fieldset>
    );
};

export default BuildingFieldset;
