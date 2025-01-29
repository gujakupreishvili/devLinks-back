import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Links } from './schema/links.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Links.name) private linksModel: Model<Links>,
    private UserService: UsersService,
  ) {}

  async create(createLinkDto: CreateLinkDto, user: string) {
    const newPost = await this.linksModel.create({ ...createLinkDto, user });
    await this.UserService.addPost(user, newPost._id);
    return newPost;
  }

  findAll() {
    return this.linksModel.find();
  }

  findOne(id: number) {
    return this.linksModel.findById(id).populate("user");
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  async remove(id) {
    const invoice = await this.linksModel.findById(id)
    if(!invoice) throw new NotFoundException
    const deleteInvoice = await this.linksModel.findByIdAndDelete(id)
    return deleteInvoice;
  }
}
