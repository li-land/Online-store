import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Product } from 'src/product/models/product.model';
import { Catalog } from './models/catalog.model';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Roles } from 'src/role/role-auth.decorators';
import { RolesGuard } from 'src/role/role.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Каталоги')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiOperation({ summary: 'Добавление каталога' })
  @ApiResponse({
    status: 200,
    type: Catalog,
    description: 'Возвращаются данные каталога',
  })
  @ApiResponse({
    status: 400,
    description: 'Каталог уже существует',
  })
  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async create(@Body() createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return await this.catalogService.createCatalog(createCatalogDto);
  }

  @ApiOperation({ summary: 'Получение всех каталогов' })
  @ApiResponse({
    status: 200,
    type: [Catalog],
    description: 'Возвращаются все каталоги',
  })
  @Get()
  async getAll(): Promise<Catalog[]> {
    return await this.catalogService.getAllCatalogs();
  }

  @ApiOperation({ summary: 'Получение товаров из одного каталога' })
  @ApiResponse({
    status: 200,
    type: [Product],
    description: 'Возвращаются данные каталога',
  })
  @ApiResponse({
    status: 404,
    description: 'Запрашиваемого каталога не существует',
  })
  @Get(':id')
  async getProducts(
    @Param('id') id: string,
    @Query() queryParams: { page: string; limit: string; sorting?: string },
  ): Promise<{ rows: Product[]; count: number } | Product[]> {
    return await this.catalogService.getCatalogsProducts(
      +id,
      +queryParams.page,
      +queryParams.limit,
      queryParams.sorting,
    );
  }
  @ApiOperation({ summary: 'Получение товаров из одного каталога' })
  @ApiResponse({
    status: 200,
    description: 'Название каталога c id изменено',
  })
  @ApiResponse({
    status: 400,
    description: 'Каталог c таким названием уже существует',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ): Promise<string> {
    return this.catalogService.updateCatalog(+id, updateCatalogDto);
  }

  @ApiOperation({ summary: 'Удаление каталога' })
  @ApiResponse({
    status: 200,
    description: 'Каталог с id удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Каталога с id не существует',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string): Promise<string> {
    return await this.catalogService.removeCatalog(+id);
  }
}
