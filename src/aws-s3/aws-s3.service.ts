import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from "aws-sdk"

@Injectable()
export class AwsS3Service {
  private bucketName;
  private serviceStorage;
  constructor(){
    this.bucketName = process.env.AWS_BUCKET_NAME
    this.serviceStorage = new AWS.S3({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION
    })
  }
  async downloadImage(filePath: string){
    if(!filePath) return
    const config = {
        Bucket: this.bucketName,
        Key: filePath
    }
    return this.serviceStorage.getSignedUrlPromise("getObject", config)
  
}
async uploadImage(filepath, buffer){
  try {
    const config  = {
      Key:filepath,
      Bucket: this.bucketName,
      Body: buffer 
    }
    await this.serviceStorage.putObject(config).promise()
    const url =  await this.downloadImage(filepath)
    return url

  } catch (error) {
    throw new BadRequestException('Could not upload file') 
  }
}
async deleteImage (filePath){
  if(!filePath) return
  try {
    const config = {
      Bucket: this.bucketName,
      Key: filePath,
    }
    await this.serviceStorage.deleteObject(config).promise()
    return "delete successfully"
    
  } catch (error) {
    
  }
}
}
