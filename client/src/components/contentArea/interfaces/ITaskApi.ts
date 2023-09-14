import { Priority } from '../../taskForm/enums/Priority';
import { Status } from '../../taskForm/enums/Status';

export interface ITaskApi {
  id: string;
  date: string;
  title: string;
  description: string;
  priority: `${Priority}`;
  status: `${Status}`;
}
