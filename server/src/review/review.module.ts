import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './models/review.model';
import { User } from 'src/user/user.model';
import { Product } from 'src/product/models/product.model';
import { ProductModule } from 'src/product/product.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Review, User, Product]),
    forwardRef(() => ProductModule),
    TokenModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
