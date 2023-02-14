import { Controller, Get, Param, Query, Post, HttpCode, Body, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';
import { ProductDto } from './products.dto'

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

   @HttpCode(200)
   @Post('/add')
   async addProduct(
      @Body()
      body: ProductDto,
   ) {
      return this.productsService.create({ ...body });
   }

   @HttpCode(200)
   @Put('/delete/:_id')
   async deleteVideo(@Param('_id') _id: Types.ObjectId) {
      return this.productsService.delete(_id);
   }
}
