import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './products.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ProductsService {
   constructor(
      @InjectModel(ProductModel)
      private readonly ProductModel: ModelType<ProductModel>,
   ) {}

   async getAll(searchTerm?: string, colorFilter?: string, modelFilter?: string) {
      let options = {};

      if (searchTerm) {
         options = {
            $or: [
               {
                  model: new RegExp(searchTerm, 'i'),
               },
               {
                  title: new RegExp(searchTerm, 'i'),
               },
               {
                  colors: new RegExp(searchTerm, 'i'),
               },
               {
                  info: new RegExp(searchTerm, 'i'),
               },
            ],
         };
      } else if (colorFilter || modelFilter) {
         options = {
            $and: [
               {
                  colors: new RegExp(colorFilter, 'i'),
               },
               {
                  model: new RegExp(modelFilter, 'i')
               }
            ],
         };
      }

      console.log(options);

      return this.ProductModel.find(options).exec();
   }

   async byId(_id: Types.ObjectId): Promise<ProductModel> {
      const product = await this.ProductModel.findById(_id);
      return product;
   }
}
