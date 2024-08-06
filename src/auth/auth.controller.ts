import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthCheck, AuthDTO, LoginResponse } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() data: AuthDTO): Promise<LoginResponse> {
    return this.authService.loginUser(data);
  }

  @Post('registration')
  async registration(@Body() data: AuthDTO): Promise<AuthDTO> {
    return this.authService.createUser(data);
  }

  @Patch('refrash')
  async refrash(@Body() token): Promise<string> {
    return this.authService.refrashToken(token);
  }

  @Patch('checkAuth')
  async auth(@Body() { access_token }: { [key: string]: string }): Promise<AuthCheck> {
    return await this.authService.checkToken(access_token);
  }
}
