import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
   @prop()
   title: string;

   @prop()
   info: string;

   @prop()
   model: string;

   @prop()
   img: string;

   @prop()
   year: string;

   @prop()
   type: string;

   @prop()
   power: string;

   @prop()
   cub: string;

   @prop()
   colors: string[];

   @prop()
   price: string;
}
