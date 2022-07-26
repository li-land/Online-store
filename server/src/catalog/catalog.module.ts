import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { Catalog } from './models/catalog.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from 'src/product/product.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([Catalog]), ProductModule, TokenModule],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
