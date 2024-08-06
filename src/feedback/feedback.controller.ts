import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDTO } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbaclService: FeedbackService) { }

  @UseGuards(AuthGuard)
  @Post()
  saveMessage(@Body() data: FeedbackDTO): Promise<FeedbackDTO> {
    return this.feedbaclService.save(data);
  }
}
