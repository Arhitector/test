import { Controller } from "react-hook-form";

import { Label, Input, Message } from 'theme-ui'
import { InputCustomProps } from "./types";

const InputCustom: React.FC<InputCustomProps> = ({
    control,
    name,
    label,
    validation,
    defaultValue,
    error,
    other,
  }) => {
    return <>
        <Label htmlFor={name}>{label}</Label>
        <Controller
          name={name}
          control={control}
          rules={validation}
          defaultValue={defaultValue}
          render={({ field }) => <Input {...field} id={name}
          value={field.value !== null ? field.value.toString() : ''}
          onChange={(e) => {
            field.onChange(parseInt(e.target.value) || null);
          }}
          {...other} />}
        />
        {
          error && <Message>{error}</Message>
        }
    </>
  }

export default InputCustom;