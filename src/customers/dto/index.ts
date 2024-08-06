import { IsString } from "class-validator"

export class CustomerDTO {
  @IsString()
  avatar: string
  @IsString()
  company: string
  @IsString()
  email: string
  @IsString()
  info: string
}