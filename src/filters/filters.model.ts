import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface FiltersModel extends Base {}

export class FiltersModel extends TimeStamps {
   @prop()
   type: string;

   @prop()
   name: string;

   @prop()
   value: string;
}
