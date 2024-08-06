import { URL_FEEDBACK } from "@/constants";
import { api } from '@/api';

class FeedbackService {
  async sendMessage(message: FeedbackTypes): Promise<void> {
    api.post(URL_FEEDBACK, message)
  }
}

export const feedbackService = new FeedbackService();