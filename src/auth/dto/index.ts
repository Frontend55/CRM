import { IsBoolean, IsString } from "class-validator"

export class AuthDTO {
  @IsString()
  email: string

  @IsString()
  password: string
}

export class LoginResponse {
  @IsString()
  email: string

  @IsString()
  password: string

  @IsString()
  token: string
}

export class AuthCheck {
  @IsBoolean()
  isAuth: boolean
}