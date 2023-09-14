"use client";

import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { Grid, Box, Alert, LinearProgress } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '@/helpers/sendApiRequest';
import TaskCounter from '../taskCounter/TaskCounter';
import Task from '../task/Task';
import { ITaskApi } from './interfaces/ITaskApi';
import { IUpdateTask } from '../taskForm/interfaces/IUpdateTask';
import { IDeleteTask } from '../taskForm/interfaces/IDeleteTask';
import { Status } from '../taskForm/enums/Status';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

const ContentArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery(['tasks'], async () => {
    return await sendApiRequest<ITaskApi[]>('/api', 'GET');
  });

  const taskUpdatedContext = useContext(TaskStatusChangedContext);

  // update inProgress task status
  const updateTaskMutation = useMutation((data: IUpdateTask) =>
    sendApiRequest('/api/tasks', 'PUT', data),
  );

  const deleteTaskMutation = useMutation((data: IDeleteTask) =>
    sendApiRequest('/api/tasks', 'DELETE', data),
  );

  useEffect(() => {
    refetch();
  }, [taskUpdatedContext.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      taskUpdatedContext.toggle();
    }

    if (deleteTaskMutation.isSuccess) {
      taskUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess, deleteTaskMutation.isSuccess]);

  const onStatusChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  };

  const markCompleteHandler = (
    _e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string) => {
    updateTaskMutation.mutate({ id, status: Status.completed });
  };

  const deleteTaskHandler = (
    _e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string) => {
    deleteTaskMutation.mutate({ id });
  };

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2 style={{ fontWeight: 400 }}>
          Status Of Your Tasks As On {format(new Date(), 'PPPP')}
        </h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            status={Status.todo}
            count={data ? countTasks(data, Status.todo) : undefined}
          />
          <TaskCounter
            status={Status.inProgress}
            count={data ? countTasks(data, Status.inProgress) : undefined}
          />
          <TaskCounter
            status={Status.completed}
            count={data ? countTasks(data, Status.completed) : undefined}
          />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          {error ? (
            <Alert severity="error">
              There was an error fetching your tasks
            </Alert>
          ) : (
            ''
          )}

          {!error && Array.isArray(data) && data.length === 0 && (
            <Alert severity="warning">
              You do not have any tasks created yet. Start by creating some
              tasks
            </Alert>
          )}
          {isLoading ? (
            <LinearProgress style={{ width: '100%' }} />
          ) : (
            Array.isArray(data) &&
            data.length > 0 &&
            data?.map((task, index) => {
              return (
                <Task
                  key={index + task.priority}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  date={new Date(task.date)}
                  status={task.status}
                  priority={task.priority}
                  onStatusChange={onStatusChangeHandler}
                  onClick={markCompleteHandler}
                  onDelete={deleteTaskHandler}
                />
              );
            })
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContentArea;
