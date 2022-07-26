import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { Booking } from './booking/models/booking.model';
import { BookingInfo } from './booking/models/booking-info.model';
import { ProductInfo } from './product/models/product-info.model';
import { Role } from './role/models/role.model';
import { BasketModule } from './booking/booking.module';
import { UserRole } from './role/models/user-role.model';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { CatalogModule } from './catalog/catalog.module';
import { Token } from './token/token.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReviewModule } from './review/review.module';
import { Review } from './review/models/review.model';
import { Catalog } from './catalog/models/catalog.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Product,
        Catalog,
        Booking,
        BookingInfo,
        ProductInfo,
        Role,
        UserRole,
        Token,
        Review,
      ],
      autoLoadModels: true,
      sync: { alter: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    UserModule,
    ProductModule,
    BasketModule,
    AuthModule,
    TokenModule,
    CatalogModule,
    FilesModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
