/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';
import { Task } from './tasks.entity';
import { AppDataSource } from '../../server';
import { instanceToPlain, plainToInstance } from 'class-transformer';

class TaskController {
  public async getAll(_req: Request, res: Response): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });

      // Convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.status(200).json(allTasks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'internal server error' });
    }
  }

  public async addTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);

      // Convert the task instance to a plain object
      createdTask = instanceToPlain(createdTask) as Task;

      return res.status(201).json(createdTask);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: 'internal server error' });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Declare a variable for updatedTask
    let updatedTask: UpdateResult;

    // Update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, {
          status: req.body.status,
        }),
      );

      // Convert the updatedTask instance to an object
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (errors) {
      console.error(errors);
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Delete the task
    try {
      await AppDataSource.getRepository(Task).delete(req.body.id);

      return res.json(null).status(200);
    } catch (errors) {
      console.error(errors);
      return res.json({ error: 'Internal Server Error' }).status(500);
    }
  }
}

export const taskController = new TaskController();
