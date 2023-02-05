import { Controller, Get, Param, Query } from '@nestjs/common';
import { FiltersService } from './filters.service';

@Controller('filters')
export class FiltersController {
   constructor(private readonly filtersService: FiltersService) {}

   @Get()
   getAllFilters() {
      return this.filtersService.getAll()
   }
}
