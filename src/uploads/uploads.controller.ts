import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() files) {
    console.log(files);
  }
}
