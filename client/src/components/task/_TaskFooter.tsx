import React, { FC, ReactElement } from 'react';
import { Box, Button, Switch, FormControlLabel } from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../taskForm/enums/Status';

const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  const {
    id,
    status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box display="flex" width="100%" justifyContent="space-between" mt={4}>
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            color="warning"
            onChange={(e) => onStatusChange(e, id)}
            defaultChecked={status === Status.inProgress}
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: 'white' }}
        onClick={(e) => onClick(e, id)}
      >
        Mark Complete
      </Button>
    </Box>
  );
};

export default TaskFooter;
