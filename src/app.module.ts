import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoConfig } from './config/mongo.config'
import { FiltersModule } from './filters/filters.module';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    ProductsModule, FiltersModule, UserModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
