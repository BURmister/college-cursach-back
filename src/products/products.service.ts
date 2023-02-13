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

   async getAll(searchTerm?: string, colorsFilter?: string, modelFilter?: string, typeFilter?: string, priceFilter?: string) {
      let colorsOptions = {};
      let modelOptions = {};
      let typeOptions = {};
      let priceOptions = {};

      // p from @Query
      // const page = p || 0
      // const productPerPage = 9

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

      if (typeFilter) {
         const options = typeFilter.split(',');
         typeOptions = {
            $or: options.map((item) => ({ type: new RegExp(item, 'i') })),
         };
      }

      if (priceFilter) {
         const options = priceFilter.split(',');
         priceOptions = {
            price: { $gte: Number(options[0]), $lt: Number(options[1]) },
         };
      }

      return (
         this.ProductModel.find({
            $and: [{ ...priceOptions }, { ...typeOptions }, { ...modelOptions }, { ...colorsOptions }],
         })
            // .skip(page * productsPerPage)
            // .limit(productsPerPage)
            .exec()
      );
   }

   async byId(_id: Types.ObjectId): Promise<ProductModel> {
      const product = await this.ProductModel.findById(_id);
      return product;
   }

   // async create(userId: Types.ObjectId) {
   //    const defaultValue: VideoDto = {
   //       name: '',
   //       userId: String(userId),
   //       videoPath: '',
   //       description: '',
   //       thumbnailPath: '',
   //    };

   //    const video = await this.VideoModel.create(defaultValue);
   //    return video._id;
   // }

   // async delete(_id: string) {
   //    const deleteVideo = await this.VideoModel.findByIdAndDelete(_id).exec();

   //    if (!deleteVideo) throw new NotFoundException('video not found');

   //    return deleteVideo;
   // }
}
