import { FiltersModel } from './filters.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
   controllers: [FiltersController],
   providers: [FiltersService],
   imports: [
      TypegooseModule.forFeature([
         {
            typegooseClass: FiltersModel,
            schemaOptions: {
               collection: 'filters',
            },
         },
      ]),
      ConfigModule,
   ],
})
export class FiltersModule {}
