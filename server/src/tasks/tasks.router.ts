import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';

const tasksRouter: Router = Router();

tasksRouter.get('/', taskController.getAll);

tasksRouter.post('/tasks', createValidator, taskController.addTask);
tasksRouter.put('/tasks', updateValidator, taskController.updateTask);

export default tasksRouter;
