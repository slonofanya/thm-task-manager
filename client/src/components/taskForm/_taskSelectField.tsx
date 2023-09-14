import React, { FC, ReactElement } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ISelectField } from './interfaces/ISelectField';

const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
  const {
    disabled = false,
    name = 'selectBox',
    label = 'Select Box',
    value = '',
    onChange = (e) => console.log(e),
    items = [{ value: '', label: 'Add Items' }],
  } = props;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-id-select`}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        {items.map((item, index) => (
          <MenuItem key={item.value + index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TaskSelectField;
