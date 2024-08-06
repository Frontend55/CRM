import { Injectable } from '@nestjs/common';
import { Feedback } from './models/feedback.models';
import { InjectModel } from '@nestjs/sequelize';
import { FeedbackDTO } from './dto';

@Injectable()
export class FeedbackService {
  constructor(@InjectModel(Feedback) private readonly feedbackRepository: typeof Feedback) { }

  async save(data): Promise<FeedbackDTO> {
    await this.feedbackRepository.create(data)
    return data;
  }
}
