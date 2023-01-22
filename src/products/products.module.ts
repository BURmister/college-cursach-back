import { ProductModel } from './products.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ProductModel,
        schemaOptions: {
          collection: 'catalog',
        },
      },
    ]),
    ConfigModule,
  ],
})
export class ProductsModule {}
