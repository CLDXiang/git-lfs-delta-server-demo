import { Injectable, NotFoundException } from '@nestjs/common'
import { FileType } from './app.types'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  storeFile(file: FileType, targetPath: string) {
    const storagePath = join(process.cwd(), 'storage', targetPath)
    if (!existsSync(dirname(storagePath))) {
      mkdirSync(dirname(storagePath), { recursive: true })
    }
    writeFileSync(storagePath, file.buffer)
  }

  fetchFile(path: string) {
    const targetPath = join(process.cwd(), 'storage', path)
    if (!existsSync(dirname(targetPath))) {
      throw new NotFoundException('No such file')
    }
    return readFileSync(targetPath)
  }

  PathsNotExist(paths: string[]) {
    return paths.filter((p) => !existsSync(join(process.cwd(), 'storage', p)))
  }
}
