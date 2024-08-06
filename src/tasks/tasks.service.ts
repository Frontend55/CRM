import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './models/tasks.models';
import { createTasksDTO } from './dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private readonly tasksRepository: typeof Tasks) { }
  async getTasks(): Promise<Tasks[]> {
    return await this.tasksRepository.findAll();
  }

  async createTask(tasks): Promise<createTasksDTO> {
    tasks.status = 'sprint';
    await this.tasksRepository.create(tasks);
    return tasks;
  }

  async updateTask(task): Promise<createTasksDTO> {
    await this.tasksRepository.update({ ...task }, { where: { id: task.id } });
    return task;
  }
}
