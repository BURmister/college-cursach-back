import { Auth } from './../auth/decorators/auth.decorator';
import { Controller, Get, Put, Post, Body, Patch, Param, Delete, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { CurrentUser } from './decorators/user.decorator';
import { Types } from 'mongoose';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth() 
  async getProfile(@CurrentUser('_id') _id:Types.ObjectId) {
    return this.userService.byId(_id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('profile')
  @Auth()
  async updateProfile(@CurrentUser('_id') _id:Types.ObjectId, @Body() dto: UserDto) {
    return this.userService.updateProfile(_id, dto)
  }
}
