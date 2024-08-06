import { IsString } from "class-validator";

export class FeedbackDTO {
  @IsString()
  message: string
  @IsString()
  email: string
}