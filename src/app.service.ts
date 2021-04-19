import { Injectable } from '@nestjs/common'
import { FileType } from './app.types'
import { mkdirSync, writeFileSync, existsSync } from 'fs'
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
}
