import { TaskCounterStatusType } from '../interfaces/ITaskCounter';
import { Status } from '../../taskForm/enums/Status';

export const emitCorrectLabel = (status: TaskCounterStatusType): string => {
  switch (status) {
    case Status.todo:
      return `Todo's`;
    case Status.completed:
      return 'Completed';
    case Status.inProgress:
      return 'In Progress';
  }
};
