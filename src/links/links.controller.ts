import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createLinkDtos: CreateLinkDto[], @Req() request) {
    const userId = request.userId;
    const savedLinks = await Promise.all(
      createLinkDtos.map(dto => this.linksService.create(dto, userId)),
    );
    return savedLinks;
  }

  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.linksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: any, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.linksService.remove(id);
  }
}
