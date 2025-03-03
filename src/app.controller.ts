import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/download')
  downloadImage(@Body('filePath') filePath: string) {
    return this.appService.downloadImage(filePath);
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() request) {
    const type = file.mimetype.split('/')[1];
    const fileName = `images/${new Date().getTime()}.${type}`;
    console.log(request.userId); 
    return this.appService.uploadImage(fileName, file.buffer, request.userId );
  }

  @Delete('delete')
  deleteImage(@Body('path') path: string) {
    return this.appService.deleteImage(path);
  }

  @Post("UploadMany")
  @UseInterceptors(AnyFilesInterceptor())
  async uploadMany(@UploadedFiles() files: Express.Multer.File[], @Req() request) {
    const imageUrls = [];
    for (const file of files) {
      const type = file.mimetype.split('/')[1];
      const fileName = `images/${new Date().getTime()}.${type}`;
      const url = await this.appService.uploadImage(fileName, file.buffer, request.userId);
      imageUrls.push(url);
    }
    return imageUrls;
  }
}
