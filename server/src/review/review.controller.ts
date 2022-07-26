import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/role/role-auth.decorators';
import { RolesGuard } from 'src/role/role.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './models/review.model';
import { ReviewService } from './review.service';

@ApiTags('Отзывы')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Добавление отзыва' })
  @ApiResponse({
    status: 200,
    type: Review,
    description: 'Возвращаются данные отзыва',
  })
  @ApiResponse({
    status: 400,
    description: 'Пользователь уже оставлял отзыв на этот товар',
  })
  @Post()
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return await this.reviewService.createReview(createReviewDto);
  }

  @ApiOperation({ summary: 'Добавление отзыва' })
  @ApiResponse({
    status: 200,
    description: 'Отзыв с id удален',
  })
  @ApiResponse({
    status: 400,
    description: 'Данного отзыва уже не существует',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return await this.reviewService.removeReview(+id);
  }
}
