import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { AwsS3, AwsS3Schema } from './schema/aws-s3.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[ 
    MongooseModule.forFeature([{name: AwsS3.name, schema: AwsS3Schema}]),
    UsersModule
  ],
  providers: [AwsS3Service],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
