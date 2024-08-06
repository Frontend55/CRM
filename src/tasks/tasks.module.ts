import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tasks } from './models/tasks.models';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Tasks])],
  controllers: [TasksController],
  providers: [TasksService, JwtService]
})
export class TasksModule { }
