import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import { DataSource } from 'typeorm';
import cors from 'cors';

import TasksRouter from './src/tasks/tasks.router';
import { Task } from './src/tasks/tasks.entity';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306, // default port
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true, // for development mode.
});

const port = process.env.PORT || 3200;

app.use("/", TasksRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('MySQL DB has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
