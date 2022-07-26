import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ProductInfo,
  ProductInfoCreationAttrs,
} from './models/product-info.model';
import { Product } from './models/product.model';
import { FilesService } from 'src/files/files.service';
import { Review } from 'src/review/models/review.model';
import { User } from 'src/user/user.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
    @InjectModel(ProductInfo) private productInfoRepository: typeof ProductInfo,
    private filesService: FilesService,
  ) {}

  async getProducts(
    catalogId: number,
    page: number,
    limit: number,
    sorting?: string,
  ): Promise<{ rows: Product[]; count: number } | Product[]> {
    if (!page || !limit) {
      return await this.productRepository.findAll({ where: { catalogId } });
    }
    const offset = page * limit - limit;
    switch (sorting) {
      case 'cheaper':
        return await this.productRepository.findAndCountAll({
          where: { catalogId },
          offset,
          limit,
          order: [['price', 'ASC']],
        });
      case 'expensive':
        return await this.productRepository.findAndCountAll({
          where: { catalogId },
          offset,
          limit,
          order: [['price', 'DESC']],
        });
      case 'popular':
        return await this.productRepository.findAndCountAll({
          where: { catalogId },
          offset,
          limit,
          order: [['rating', 'DESC']],
        });
      default:
        return await this.productRepository.findAndCountAll({
          where: { catalogId },
          offset,
          limit,
        });
    }
  }
  async getOneProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findByPk(id, {
      include: [
        {
          model: ProductInfo,
        },
        {
          model: Review,
          include: [{ model: User, attributes: ['id', 'name'] }],
        },
      ],
      order: [[{ model: Review, as: 'reviews' }, 'createdAt', 'DESC']],
    });

    if (!product) {
      throw new HttpException(
        'Такого товара не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<string> {
    const candidateProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (candidateProduct) {
      throw new HttpException(
        'Такой товар уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    let imageName = '';
    if (image) {
      imageName = await this.filesService.createFile(image);
    }
    const product = await this.productRepository.create({
      ...createProductDto,
      image: imageName,
    });

    const productInfoArray: ProductInfoCreationAttrs[] = JSON.parse(
      createProductDto.info,
    );

    if (productInfoArray.length) {
      productInfoArray.forEach(
        async (productInfo) =>
          await this.productInfoRepository.create({
            title: productInfo.title,
            description: productInfo.description,
            productId: product.id,
          }),
      );
    }

    return `Товар ${product.name} успешно создан`;
  }

  async getNoveltyAndPopular(): Promise<{
    novelties: Product[];
    populars: Product[];
  }> {
    const products = await this.productRepository.findAll({
      include: [
        {
          model: Review,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    const novelties = products.slice(0, 4);
    const populars = products
      .filter((product) => product.rating === 5 && product.reviews.length > 0)
      .sort((a, b) => b.reviews.length - a.reviews.length)
      .slice(0, 8);

    return { novelties, populars };
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    image: Express.Multer.File,
  ): Promise<string> {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new HttpException(
        'Запрашиваемого товара не существует',
        HttpStatus.NOT_FOUND,
      );
    }
    let imageName = '';
    if (image) {
      imageName = await this.filesService.updateFile(image, product.image);
    }
    await this.productRepository.update(
      {
        ...updateProductDto,
        image: imageName,
      },
      { where: { id } },
    );
    return `Товар c id=${id} изменен`;
  }

  async removeProduct(id: number): Promise<string> {
    const product = await this.productRepository.findByPk(id);
    if (!product) {
      throw new HttpException(
        `Товара с id=${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.productRepository.destroy({
      where: { id },
    });
    return `Товар ${product.name} с id=${id} удален`;
  }

  async changeRating(id: number): Promise<void> {
    const product = await this.productRepository.findByPk(id, {
      include: Review,
    });
    const rating = (
      product.reviews.reduce((sum, review) => {
        return sum + review.rate;
      }, 0) / product.reviews.length
    ).toFixed(1);
    product.rating = +rating;
    await product.save();
  }
}
