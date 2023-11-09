import { TodoService } from './todoService';
import { ITodoRepository, TodoLocalStorageRepository } from '../repositories/todo';

export class Services {
  todo: TodoService;

  constructor() {
    const todoRepository: ITodoRepository = new TodoLocalStorageRepository();
    this.todo = new TodoService(todoRepository);
  }
}

const services = new Services();
export default services;
