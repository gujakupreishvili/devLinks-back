import { Query } from './../../node_modules/sift/lib/core.d';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './DTOs/crate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ){}
  finAll(){
    return this.userModel.find();
  }
  create(creeatUserDto: CreateUserDto){
    return this.userModel.create(creeatUserDto)
  }
  getById(id){
    return this.userModel.findById(id);
  }
  findOne(query){
    return this.userModel.findOne(query);
  }
  findByEmail(query){
    return this.userModel.findOne(query).select("+password")
  }
}
