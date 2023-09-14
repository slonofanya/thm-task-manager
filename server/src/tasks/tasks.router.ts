import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator, deleteValidator } from './tasks.validator';

const tasksRouter: Router = Router();

tasksRouter.get('/', taskController.getAll);

tasksRouter.post('/tasks', createValidator, taskController.addTask);
tasksRouter.put('/tasks', updateValidator, taskController.updateTask);
tasksRouter.delete('/tasks', deleteValidator, taskController.deleteTask);

export default tasksRouter;
