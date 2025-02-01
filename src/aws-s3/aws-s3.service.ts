import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AwsS3 } from './schema/aws-s3.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AwsS3Service {
  private bucketName: string;
  private serviceStorage: AWS.S3;

  constructor(
    @InjectModel(AwsS3.name) private awsS3Model: Model<AwsS3>,
    private userService: UsersService
  ) {
    this.bucketName = process.env.AWS_BUCKET_NAME;
    this.serviceStorage = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION
    });
  }

  async downloadImage(filePath: string) {
    if (!filePath) return;
    const config = {
      Bucket: this.bucketName,
      Key: filePath,
    };
    return this.serviceStorage.getSignedUrlPromise("getObject", config);
  }
  async uploadImage(filepath: string, buffer: Buffer, userId: string) {
    try {
      const config = {
        Key: filepath,
        Bucket: this.bucketName,
        Body: buffer,
      };
  
      await this.serviceStorage.putObject(config).promise();

      const url = await this.downloadImage(filepath);

      const newFile = new this.awsS3Model({
        filePath: url,
        userId: userId,
      });
 
      const savedFile = await newFile.save();
      await this.userService.addUrlId(userId, savedFile._id)
  
      return newFile;
    } catch (error) {
      throw new BadRequestException('image can not be uploaded');
    }
  }
  

  async deleteImage(filePath: string) {
    if (!filePath) return;
    try {
      const config = {
        Bucket: this.bucketName,
        Key: filePath,
      };

      await this.serviceStorage.deleteObject(config).promise();

      await this.awsS3Model.findOneAndDelete({ filePath });

      return "Deleted successfully";
      
    } catch (error) {
      throw new BadRequestException('Could not delete file');
    }
  }
}
