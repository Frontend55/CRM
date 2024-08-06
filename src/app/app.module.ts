import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { MenuModule } from 'src/menu/menu.module';
import { CustomersModule } from 'src/customers/customers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configure from '../configuration';
import { Tasks } from 'src/tasks/models/tasks.models';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { FeedbackModule } from 'src/feedback/feedback.module';

@Module({
  imports: [
    TasksModule,
    MenuModule,
    AuthModule,
    CustomersModule,
    UserModule,
    FeedbackModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configure]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ((configuration: ConfigService) => ({
        dialect: 'postgres',
        host: configuration.get('db_host'),
        post: configuration.get('db_port'),
        username: configuration.get('db_user'),
        password: configuration.get('db_password'),
        database: configuration.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [Tasks],
      })),
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
