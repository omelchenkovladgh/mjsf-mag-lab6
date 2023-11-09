import { MD5 } from 'crypto-js';

const salt = "random_str";

export enum TaskStatus {
  COMPLETED = 'completed',
  INCOMPLETED = 'incompleted',
}

export interface Task {
  id: string;
  ava: string;
  name: string;
  title: string;
  type: string;
  status: TaskStatus;
}

export function createTask(): Task {
  return {
    id: MD5(Date.now() + salt).toString(),
    ava: "",
    name: "",
    title: "",
    type: "",
    status: TaskStatus.INCOMPLETED,
  };
}