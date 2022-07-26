import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductController } from './product.controller';
import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { BookingInfo } from 'src/booking/models/booking-info.model';
import { ProductInfo } from './models/product-info.model';
import { FilesModule } from 'src/files/files.module';
import { Review } from 'src/review/models/review.model';
import { ReviewModule } from 'src/review/review.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Review, BookingInfo, ProductInfo]),
    ReviewModule,
    FilesModule,
    TokenModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
