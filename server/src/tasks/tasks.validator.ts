import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Please enter a title')
    .trim()
    .isString()
    .withMessage('Title needs to be in a text format'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('Please enter a date')
    .isString()
    .withMessage('please use a valid date format'),

  body('description')
    .trim()
    .isString()
    .withMessage('Title needs to be in a text format'),

  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('Priority can only be normal, high or low'),

  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be todo, inProgress or completed'),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is mandatory')
    .trim()
    .isString()
    .withMessage('Id needs to be a valid uuid format'),

  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status can only be todo, inProgress or completed'),
];

export const deleteValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is mandatory')
    .trim()
    .isString()
    .withMessage('Id needs to be a valid uuid format'),
];
