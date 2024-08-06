import { IsString } from "class-validator"

export class createTasksDTO {
  @IsString()
  title: string
  @IsString()
  description: string
}