import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './products.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor (
    @InjectModel(ProductModel) private readonly ProductModel: ModelType<ProductModel>,
  ) {}

  async getAll(searchTerm) {
    let options = { }
    
    if(searchTerm) {
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i')
          }
        ]
      }
    }
    
    return this.ProductModel.find({ ...options}).select('-__v').sort({createdAt: 'desc'}).exec()
  }
  
  async byId(_id:Types.ObjectId): Promise<ProductModel> {
    const product = await this.ProductModel.findById(_id)
    return product
  }
}
