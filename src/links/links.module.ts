import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Links, LinksSchema } from './schema/links.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Links.name, schema: LinksSchema}]),
    UsersModule
  ],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
