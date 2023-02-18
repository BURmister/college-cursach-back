import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserModel } from '../user/user.model'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { getJWTConfig } from 'src/config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User'
        }
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    })
  ]
})
export class AuthModule {}
