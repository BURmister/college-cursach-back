import { ModelType } from '@typegoose/typegoose/lib/types';
import { FiltersModel } from './filters.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FiltersService {
   constructor(
      @InjectModel(FiltersModel)
      private readonly FiltersModel: ModelType<FiltersModel>,
   ) {}

   getAll() {
      return this.FiltersModel.find().exec()
   }
}
