import { Injectable } from '@nestjs/common';
import { AwsS3Service } from './aws-s3/aws-s3.service';

@Injectable()
export class AppService {
  constructor(private awsService: AwsS3Service) {}

  getHello(): string {
    return 'Hello World!';
  }

  downloadImage(filePath: string) {
    return this.awsService.downloadImage(filePath);
  }

  uploadImage(filePath: string, buffer: Buffer, userId: string, ) {
    return this.awsService.uploadImage(filePath, buffer, userId);
  }

  deleteImage(path: string) {
    return this.awsService.deleteImage(path);
  }
}
