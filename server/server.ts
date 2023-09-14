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

const dbName = process.env.DB_NAME || 'thm'
const dbHost = process.env.DB_HOST || "localhost"
const dbUser = process.env.DB_MONGO_USERNAME || 'some_username'
const dbPass = process.env.DB_MONGO_PASSWORD || 'veryStrongPassword1'

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: dbHost,
  port: 27017,
  database: dbName,
  username: dbUser,
  password: dbPass,
  entities: [Task],
  synchronize: true, // for development mode.
  authSource: 'admin',
});

const port = process.env.PORT || 8080;

app.use("/", TasksRouter);

AppDataSource.initialize()
  .then(() => {
    app.listen(port);
    console.log('DB has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
