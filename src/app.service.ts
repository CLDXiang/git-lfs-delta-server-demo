import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { FileType } from './app.types'
import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
  readdirSync,
} from 'fs'
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

  SearchOid(prefix: string) {
    if (prefix.length < 6) {
      throw new BadRequestException('Length of prefix should be at least six')
    }
    const firstTwoChars = prefix.slice(0, 2)
    const ThirdAndFourthChars = prefix.slice(2, 4)
    const dirPath = join(
      process.cwd(),
      'storage',
      firstTwoChars,
      ThirdAndFourthChars,
    )
    if (!existsSync(dirPath)) {
      // if no such dir, return empty array
      return []
    }
    return readdirSync(dirPath).filter((file) => file.startsWith(prefix))
  }
}
