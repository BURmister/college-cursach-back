import { prop } from '@typegoose/typegoose';
import { IsString } from 'class-validator';

export class ProductDto {
   @IsString()
   title: string;

   @IsString()
   info: string;

   @IsString()
   model: string;

   @IsString()
   year: string;

   @IsString()
   type: string;

   @IsString()
   power: string;

   @IsString()
   cub: string;

   colors: string[];

   @IsString()
   price: string;
}
