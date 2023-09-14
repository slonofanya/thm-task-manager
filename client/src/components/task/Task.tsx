import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import TaskHeader from './_TaskHeader';
import TaskDescription from './_TaskDescription';
import TaskFooter from './_TaskFooter';
import { ITask } from './interfaces/ITask';
import { Priority } from '../taskForm/enums/Priority';
import { Status } from '../taskForm/enums/Status';
import { emitBorderColor } from './helpers/emitBorderColor';

const Task: FC<ITask> = (props): ReactElement => {
  const {
    id,
    title = 'Test Title',
    date = new Date(),
    description = 'Test Description',
    priority = Priority.normal,
    status = Status.completed,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: emitBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        onStatusChange={onStatusChange}
        onClick={onClick}
        id={id}
        status={status}
      />
    </Box>
  );
};

export default Task;
