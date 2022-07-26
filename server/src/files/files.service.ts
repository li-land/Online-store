import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(image: Express.Multer.File): Promise<string> {
    try {
      const imageFormat = image.originalname.split('.')[1];
      const imageName = uuid.v4() + '.' + imageFormat;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, imageName), image.buffer);
      return imageName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи изображения',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateFile(
    image: Express.Multer.File,
    lastImageName: string,
  ): Promise<string> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      fs.unlink(path.join(filePath, lastImageName), (error) => {
        if (error) {
          console.log('Произошла ошибка при удалении старого файла ' + error);
        }
      });
      const imageFormat = image.originalname.split('.')[1];
      const imageName = uuid.v4() + '.' + imageFormat;
      fs.writeFileSync(path.join(filePath, imageName), image.buffer);
      return imageName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при обновлении изображения',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
