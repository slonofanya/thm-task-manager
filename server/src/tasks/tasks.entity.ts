import {
  Entity,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  ObjectId,
  Column
} from 'typeorm';
import { Transform } from 'class-transformer'
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectId;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  date: string;

  @Column({
    type: 'longtext',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.normal,
  })
  priority: Priority;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.todo,
  })
  status: Status;
}
