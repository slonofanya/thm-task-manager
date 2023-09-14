import { Priority } from '../../taskForm/enums/Priority';

export const emitBorderColor = (priority: string): string => {
  switch (priority) {
    case Priority.high:
      return 'error.high';
    case Priority.normal:
      return 'grey.900';
    case Priority.low:
      return 'info.light';
    default:
      return 'grey.900';
  }
};
