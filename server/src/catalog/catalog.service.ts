import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/product/models/product.model';
import { ProductService } from 'src/product/product.service';
import { Catalog } from './models/catalog.model';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog) private catalogRepository: typeof Catalog,
    private productService: ProductService,
  ) {}
  async createCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    const candidateCatalog = await this.catalogRepository.findOne({
      where: { name: createCatalogDto.name },
    });
    if (candidateCatalog) {
      throw new HttpException(
        'Такой каталог уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.catalogRepository.create({ ...createCatalogDto });
  }

  async getAllCatalogs(): Promise<Catalog[]> {
    return await this.catalogRepository.findAll();
  }

  async getCatalogsProducts(
    id: number,
    page: number,
    limit: number,
    sorting?: string,
  ): Promise<{ rows: Product[]; count: number } | Product[]> {
    const catalog = await this.catalogRepository.findOne({ where: { id } });
    if (!catalog) {
      throw new HttpException(
        'Запрашиваемого каталога не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.productService.getProducts(id, page, limit, sorting);
  }

  async updateCatalog(
    id: number,
    updateCatalogDto: UpdateCatalogDto,
  ): Promise<string> {
    const catalog = await this.catalogRepository.findOne({
      where: { name: updateCatalogDto.name },
    });
    if (catalog) {
      throw new HttpException(
        'Каталог c таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.catalogRepository.update(
      { name: updateCatalogDto.name },
      { where: { id } },
    );
    return `Название каталога c id=${id} изменено`;
  }

  async removeCatalog(id: number): Promise<string> {
    const catalog = await this.catalogRepository.findByPk(id);
    if (!catalog) {
      throw new HttpException(
        `Каталога с id=${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.catalogRepository.destroy({
      where: { id },
    });
    return `Каталог с id=${id} удален`;
  }

  async getOne(id: number): Promise<Catalog> {
    const catalog = await this.catalogRepository.findByPk(id);
    if (!catalog) {
      throw new HttpException(
        `Каталога с id=${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
    return catalog;
  }
}
