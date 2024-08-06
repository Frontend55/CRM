import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Feedback } from './models/feedback.models';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Feedback]), JwtModule],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule { }
