import { genSalt, hash } from 'bcryptjs';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException, NotFoundException } from '@nestjs/common/exceptions';
import { UserDto } from './user.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {

   constructor(
      @InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
   ) {}

   async byId(_id:Types.ObjectId) {
      const user = await this.UserModel.findById(_id, '-password -__v')
      if(!user) throw new UnauthorizedException('user not found')

      return user
   }

   async updateProfile(_id:Types.ObjectId, dto: UserDto) {
      const user = await this.byId(_id)
      const isSameUser = await this.UserModel.findOne({email: dto.email})

      if(isSameUser && String(_id) !== String(isSameUser._id)) throw new NotFoundException('email is busy')

      if(dto.password) {
         const salt = await genSalt(10)
         user.password = await hash(dto.password, salt)
      }

      user.email = dto.email
      await user.save()

      return "user has been changed"
   }

   async getMostPopular() {
      return this.UserModel.find({subscribersCount: {$gt: 0}}, '-password -__v').sort({subscribersCount: -1}).exec()
   }
}
