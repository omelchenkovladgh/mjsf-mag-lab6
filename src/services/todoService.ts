import { Task } from '../models/tasks';
import { ITodoRepository } from '../repositories/todo';

export class TodoService {
  repo: ITodoRepository;

  constructor(repository: ITodoRepository) {
    this.repo = repository;
  }

  save(model: Task): Promise<Task> {
    return this.repo.save(model);
  }

  delete(id: string): Promise<Task[]> {
    return this.repo.delete(id);
  }

  edit(id: string, model: Task): Promise<Task | null> {
    return this.repo.edit(id, model);
  }

  find(id: string): Promise<Task | null> {
    return this.repo.find(id);
  }

  fetch(): Promise<Task[]> {
    return this.repo.fetch();
  }
}