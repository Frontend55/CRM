import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTasksDTO } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) { }

  @UseGuards(AuthGuard)
  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: createTasksDTO) {
    this.taskService.createTask(dto);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() task: createTasksDTO) {
    this.taskService.updateTask(task);
  }
}
