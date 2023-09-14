"use client";

import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import TaskTitleField from './_taskTitleField';
import TaskDescriptionField from './_taskDescriptionField';
import TaskDateField from './_taskDateField';
import TaskSelectField from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../contentArea/interfaces/ICreateTask';
import { ITaskApi } from '../contentArea/interfaces/ITaskApi';
import { TaskStatusChangedContext } from '../../context';

const TaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [status, setStatus] = useState<string>(Status.todo);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const taskUpdatedContext = useContext(TaskStatusChangedContext);

  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest<ITaskApi>('http://localhost:3200/tasks', 'POST', data),
  );

  const createTaskHandler = () => {
    if (!title || !description || !date) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      priority,
      status,
    };

    createTaskMutation.mutate(task);
  };

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccessAlert(true);
      taskUpdatedContext.toggle();
    }

    const alertTimeout = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 7000);

    return () => {
      clearTimeout(alertTimeout);
    };
  }, [createTaskMutation.isSuccess]);

  return (
    <Box
      px={4}
      my={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {showSuccessAlert && (
        <Alert severity="success" sx={{ width: '100%', marginBottom: '16px' }}>
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      )}

      <Typography mb={2} component="h2" variant="h6">
        Create a Task
      </Typography>

      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isLoading}
        />
      </Stack>

      <Stack direction="row" sx={{ width: '100%' }} spacing={2} mt={2}>
        <TaskSelectField
          disabled={createTaskMutation.isLoading}
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as string)}
          items={[
            { value: Status.todo, label: Status.todo.toUpperCase() },
            {
              value: Status.inProgress,
              label: Status.inProgress.toUpperCase(),
            },
            { value: Status.completed, label: Status.completed.toUpperCase() },
          ]}
        />
        <TaskSelectField
          disabled={createTaskMutation.isLoading}
          label="Priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as string)}
          items={[
            { value: Priority.high, label: Priority.high.toUpperCase() },
            {
              value: Priority.normal,
              label: Priority.normal.toUpperCase(),
            },
            { value: Priority.low, label: Priority.low.toUpperCase() },
          ]}
        />
      </Stack>

      <Stack
        sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        spacing={2}
        mt={2}
      >
        {createTaskMutation.isLoading && (
          <LinearProgress style={{ width: '100%' }} />
        )}
        <Button
          disabled={!title || !description || !date || !priority || !status}
          variant="contained"
          size="large"
          fullWidth
          onClick={createTaskHandler}
        >
          Create a Task
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;
