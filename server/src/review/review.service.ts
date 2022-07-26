import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private reviewRepository: typeof Review,
    private productService: ProductService,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const candidateReview = await this.reviewRepository.findOne({
      where: {
        userId: createReviewDto.userId,
        productId: createReviewDto.productId,
      },
    });
    if (candidateReview) {
      throw new HttpException(
        'Пользователь уже оставлял отзыв на этот товар',
        HttpStatus.BAD_REQUEST,
      );
    }

    const review = await this.reviewRepository.create({
      ...createReviewDto,
    });

    await this.productService.changeRating(createReviewDto.productId);
    return review;
  }
  async removeReview(id: number): Promise<string> {
    const candidateReview = await this.reviewRepository.findByPk(id);
    if (!candidateReview) {
      throw new HttpException(
        'Данного отзыва уже не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.reviewRepository.destroy({ where: { id } });

    return `Отзыв с id=${id} удален`;
  }
}
