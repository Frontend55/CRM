import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthModel } from './models/auth.model';
import { AuthDTO, LoginResponse } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(@InjectModel(AuthModel)
  private readonly authRepository: typeof AuthModel,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 18);
  }

  async getUser(params) {
    const user = await this.authRepository.findOne({
      where: {
        email: params.email
      }
    });
    return user;
  }

  async loginUser(data: AuthDTO): Promise<LoginResponse> {
    const user = await this.getUser({ email: data.email })
    if (!user) throw new Error('User not found');
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) throw new BadRequestException('Data is not validete');

    const token = await this.createToken({ email: user.email });

    const { email, password } = user;
    return { email, password, token };
  }

  async createUser(data: AuthDTO): Promise<AuthDTO> {
    const user = await this.authRepository.findOne({
      where: {
        email: data.email
      }
    });
    if (user) throw new BadRequestException('User exist');
    const { email, password } = data;
    const pass = await this.hashPassword(password);

    await this.authRepository.create({ email, password: pass })

    return data;
  }

  async createToken(data): Promise<string> {
    return await this.jwtService.signAsync({ email: data.email }, {
      secret: this.configService.get('jwt_secret'),
      expiresIn: this.configService.get('jwt_expires')
    })
  }

  async refrashToken(data): Promise<string> {
    const [type, token] = data.token.split(' ') ?? [];
    const tk = type === 'Bearer' ? token : undefined;
    const user = await this.jwtService.decode(tk);

    return await this.jwtService.signAsync({ email: user.email }, {
      secret: this.configService.get('jwt_secret'),
      expiresIn: this.configService.get('jwt_expires')
    })
  }

  async checkToken(token: string) {
    return await this.jwtService.verifyAsync(
      token,
      {
        secret: this.configService.get('jwt_secret')
      }
    ).then((resp) => {
      return { isAuth: true }
    }).catch(() => { return { isAuth: false } });
  }
}
