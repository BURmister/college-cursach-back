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

   async getAll(searchTerm?: string, colorsFilter?: string, modelFilter?: string) {
      let colorsOptions = {};
      let modelOptions = {};

      if (searchTerm) {
         return this.ProductModel.find({
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
         }).exec();
      }

      if (colorsFilter) {
         const options = colorsFilter.split(',');
         colorsOptions = {
            $or: options.map((item) => ({ colors: new RegExp(item, 'i') })),
         };
      }

      if (modelFilter) {
         const options = modelFilter.split(',');
         modelOptions = {
            $or: options.map((item) => ({ model: new RegExp(item, 'i') })),
         };
      }

      return this.ProductModel.find({
         $and: [{ ...modelOptions }, { ...colorsOptions }],
      }).exec();
   }

   async byId(_id: Types.ObjectId): Promise<ProductModel> {
      const product = await this.ProductModel.findById(_id);
      return product;
   }
}
