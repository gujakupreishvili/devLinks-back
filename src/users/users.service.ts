
import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.userModel.findById(id).populate("links").populate("urlId"); ;
  }
  findOne(query){
    return this.userModel.findOne(query);
  }
  findByEmail(query){
    return this.userModel.findOne(query).select("+password")
  }
  async addPost(userId, linksId) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException();
    
    const updateUser = await this.userModel.findByIdAndUpdate(
        userId, 
        { $push: { links: { $each: Array.isArray(linksId) ? linksId : [linksId] } } }, 
        { new: true }
    );

    return updateUser;
}

  async addUrlId (userId, urlId){
    const user = await this.userModel.findById(userId)
    if (!user) throw new  NotFoundException
    console.log(user, "user")
    user.urlId=urlId
    const updateUser = await this.userModel.findByIdAndUpdate(userId, user,{new: true})
    return updateUser
  }
}
