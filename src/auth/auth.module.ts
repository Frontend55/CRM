import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModel } from './models/auth.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([AuthModel]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
