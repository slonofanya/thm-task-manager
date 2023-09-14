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
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

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

type Values = {
  title: string
  description: string
  date: Date
  priority: string
  status: string
};

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  priority: yup.string().required(),
  status: yup.string().required(),
})

const TaskForm: FC = (): ReactElement => {
  const {
    handleSubmit,
    formState,
    control,
    reset
  } = useForm<Values>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
      status: Status.todo,
      priority: Priority.normal,
    }
  })

  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const taskUpdatedContext = useContext(TaskStatusChangedContext);

  const createTaskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest<ITaskApi>('/api/tasks', 'POST', data),
  );

  const createTaskHandler: SubmitHandler<Values> = (values) => {
    if (formState.isValid) {
      createTaskMutation.mutate({
        ...values,
        date: values.date.toString(),
      });
    }
  };

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccessAlert(true);
      reset()
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
    <form onSubmit={handleSubmit(createTaskHandler)}>
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
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TaskTitleField
                onChange={field.onChange}
                value={field.value}
                disabled={createTaskMutation.isLoading}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TaskDescriptionField
                onChange={field.onChange}
                value={field.value}
                disabled={createTaskMutation.isLoading}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TaskDateField
                onChange={field.onChange}
                value={field.value}
                disabled={createTaskMutation.isLoading}
              />
            )}
          />
        </Stack>

        <Stack direction="row" sx={{ width: '100%' }} spacing={2} mt={2}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TaskSelectField
                disabled={createTaskMutation.isLoading}
                label="Status"
                onChange={field.onChange}
                value={field.value}
                items={[
                  { value: Status.todo, label: Status.todo.toUpperCase() },
                  {
                    value: Status.inProgress,
                    label: Status.inProgress.toUpperCase(),
                  },
                  { value: Status.completed, label: Status.completed.toUpperCase() },
                ]}
              />
            )}
          />

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TaskSelectField
                disabled={createTaskMutation.isLoading}
                label="Priority"
                onChange={field.onChange}
                value={field.value}
                items={[
                  { value: Priority.high, label: Priority.high.toUpperCase() },
                  {
                    value: Priority.normal,
                    label: Priority.normal.toUpperCase(),
                  },
                  { value: Priority.low, label: Priority.low.toUpperCase() },
                ]}
              />
            )}
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
            disabled={!formState.isValid}
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Create a Task
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default TaskForm;
