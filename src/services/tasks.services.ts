
import { URL_TASKS } from "@/constants";
import { dataTask } from '@/types/Task.types';
import { api } from "@/api";

class TasksServices {
  async getAllTasks(): Promise<dataTask[]> {
    const { data } = await api.get(URL_TASKS);

    return data || [];
  }

  async createTask(task: dataTask): Promise<void> {
    await api.post(URL_TASKS, task);
  }

  async updateTask(task: dataTask): Promise<void> {
    await api.put(URL_TASKS, task);
  }
}

export const TasksService = new TasksServices();