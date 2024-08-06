import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthModel } from 'src/auth/models/auth.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([AuthModel])],
  controllers: [UserController],
  providers: [UserService, JwtService, AuthService]
})
export class UserModule { }
