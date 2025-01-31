import { Body, Controller, Delete, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/download')
  downloadImage(@Body('filePath') filePath){
    return this.appService.downloadImage(filePath)
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File){
    const type = file.mimetype.split('/')[1]
    const fileName = `images/${new Date().getTime()}.${type}`
    return this.appService.uploadImage(fileName,file.buffer)
  }
  @Delete('delete')
  deleteImage(@Body('path') path){
    return this.appService.deleteImage(path)
  }
  @Post("UploadMany")
  @UseInterceptors(AnyFilesInterceptor())
   async uploadMany(@UploadedFiles() files: Express.Multer.File[]){
    const imageUrls = []
    for(const file of files){
      const type = file.mimetype.split('/')[1]
      const fileName = `images/${new Date().getTime()}.${type}`
      const url = await this.appService.uploadImage(fileName,file.buffer)
      imageUrls.push(url)
    }
    return imageUrls
  }


}
