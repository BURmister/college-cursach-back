import { Controller, Get, Param, Query, Post, HttpCode, Body, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';
import { ProductDto } from './products.dto'
import { Auth } from 'src/auth/decorators/auth.decorator';

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

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Post('/add')
   @Auth()
   async addProduct(
      @Body()
      body: ProductDto,
   ) {
      return this.productsService.create({ ...body });
   }

   @UsePipes(new ValidationPipe())
   @HttpCode(200)
   @Put('/delete/:_id')
   @Auth()
   async deleteVideo(@Param('_id') _id: string) {
      return this.productsService.delete(_id);
   }
}
