import { CreateTaskInput, UpdateTaskInput, DeleteTaskInput } from './task.inputs';
import { TaskService } from './task.service';

export class TaskController {
  private taskService = new TaskService();

  create(input: CreateTaskInput) {
    return this.taskService.create(input);
  }

  update(input: UpdateTaskInput) {
    const { id, name } = input;

    return this.taskService.update(id, { name });
  }

  delete(input: DeleteTaskInput) {
    const { id } = input;

    return this.taskService.delete(id);
  }
}
