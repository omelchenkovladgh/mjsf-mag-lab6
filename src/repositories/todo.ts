import { Task } from "../models/tasks";

export interface ITodoRepository {
    save(model: Task): Promise<Task>;
    find(id: string): Promise<Task | null>;
    fetch(): Promise<Task[]>;
    edit(id: string, updatedTask: Task): Promise<Task | null>;
    delete(id: string): Promise<Task[]>;
}

export class TodoLocalStorageRepository implements ITodoRepository {
    private getItems(): Task[] {
      const storedItems = localStorage.getItem('todos');
      return storedItems ? JSON.parse(storedItems) : [];
    }
  
    save(model: Task): Promise<Task> {
      return new Promise((resolve) => {
        const items = this.getItems();
        items.push(model);
        localStorage.setItem("todos", JSON.stringify(items));
        resolve(model);
      });
    }
  
    delete(id: string): Promise<Task[]> {
      return new Promise((resolve) => {
        const items = this.getItems();
        const filteredItems = items.filter((item) => item.id !== id);
        localStorage.setItem('todos', JSON.stringify(filteredItems));
        resolve(filteredItems);
      });
    }
  
    edit(id: string, updatedTask: Task): Promise<Task | null> {
      return new Promise((resolve) => {
        const items = this.getItems();
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
          items[index] = updatedTask;
          localStorage.setItem("todos", JSON.stringify(items));
          resolve(updatedTask);
        } else {
          resolve(null);
        }
      });
    }
  
    find(id: string): Promise<Task | null> {
      return new Promise((resolve) => {
        const items = this.getItems();
        const foundItems = items.filter((item) => item.id === id);
        if (foundItems.length > 0) {
          resolve(foundItems[0]);
        } else {
          resolve(null);
        }
      });
    }
  
    fetch(): Promise<Task[]> {
      return new Promise((resolve) => {
        resolve(this.getItems());
      });
    }
  }