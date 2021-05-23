import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service'
import { FileType } from './app.types'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile()
    file: FileType,
    @Body()
    body: {
      path: string
    },
  ) {
    if (!file) {
      throw new BadRequestException('No valid file content')
    }
    if (!body.path) {
      throw new BadRequestException(
        'please provide a relative path to store the file',
      )
    }
    this.appService.storeFile(file, body.path)
  }

  @Post('download')
  async DownloadFile(@Body() body: { path: string }) {
    return this.appService.fetchFile(body.path)
  }

  @Post('not-exist')
  async NotExist(@Body() body: { paths: string[] }) {
    return this.appService.PathsNotExist(body.paths)
  }

  @Get('search-oid')
  async SearchOid(@Query() prefix: string) {
    return this.appService.SearchOid(prefix)
  }
}
