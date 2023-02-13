import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';

@Controller('catalog')
export class ProductsController {
   constructor(private readonly productsService: ProductsService) {}

   @Get(':_id')
   async getProduct(@Param('_id') _id: Types.ObjectId) {
      return this.productsService.byId(_id);
   }

   @Get()
   async getAllProducts(
      @Query('searchTerm') searchTerm?: string,
      @Query('typeFilter') typeFilter?: string,
      @Query('modelFilter') modelFilter?: string,
      @Query('colorsFilter') colorsFilter?: string,
      @Query('priceFilter') priceFilter?: string,
   ) {
      return this.productsService.getAll(searchTerm, colorsFilter, modelFilter, typeFilter, priceFilter);
   }

   // @UsePipes(new ValidationPipe())
   // @HttpCode(200)
   // @Post(':id')
   // @Auth()
   // async createVideo(@CurrentUser('_id') _id: Types.ObjectId) {
   //    return this.videoService.create(_id);
   // }
   
   // @HttpCode(200)
   // @Put(':id')
   // @Auth()
   // async deleteVideo(@Param('_id', IdValidationPipe) _id: string) {
   //    return this.videoService.delete(_id);
   // }
}
