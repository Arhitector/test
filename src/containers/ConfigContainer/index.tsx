import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { Box, Flex, Button, Divider } from 'theme-ui';

import { useStateData } from '../../proxy/state';
import BuildingFieldset from "../../components/BuildingFieldset";
import { playBuild } from '../../utils/play';

import { FormData } from "./types";
import { BuildingMin } from "../../types/Buildings";

const defaultBuilding = {
    id: 0,
    numberOfElevators: 0,
    numberOfFloors: 2,
}

const ConfigContainer: React.FC = () => {
  const { setState } = useStateData();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData, FieldValues>({
    defaultValues: {
      buildings: [],
    }
  });
  const { fields, append, remove } = useFieldArray({
    name: 'buildings',
    control,
  });
  
  const onSubmit = (data: { buildings: BuildingMin[]; }) => {
    data.buildings && setState(data.buildings);
    playBuild();
  };

  return (
    <>
      <Button mb={2} variant='secondary' onClick={() => append(defaultBuilding)}>Add Building</Button>
      <Divider />
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex sx={{ flexWrap: 'wrap' }}>
          {
            fields.map((el, idx) => 
              <BuildingFieldset
                key={el.id}
                control={control}
                building={{...el, id: idx}}
                handleDestroy={() => remove(idx)}
                errors={errors}
              />
            )
          }
        </Flex>
        { !!fields.length && <Divider mt={3} />}
        <Button mt={2} type="submit" >Let's build</Button>
      </Box>
      </>
  );
};

export default ConfigContainer;