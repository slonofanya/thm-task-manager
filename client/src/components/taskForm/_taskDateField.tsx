import React, { FC, ReactElement } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { IDateField } from './interfaces/IDateField';

const TaskDateField: FC<IDateField> = (props): ReactElement => {
  const {
    disabled = false,
    value = new Date(),
    onChange = (e) => console.log(e),
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        {...props}
        label="Task Date"
        format="dd/MM/yyyy"
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default TaskDateField;
