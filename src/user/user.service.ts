import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) { }
  async user(request) {
    const { email } = request.user;
    return { email };
  }
}
