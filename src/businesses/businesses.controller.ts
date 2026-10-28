import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { BusinessItemDto, BusinessReviewDto, CreateBusinessPageDto, UpdateBusinessDto } from '../common/dto';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from '../media/media.service';
import { BusinessesService, BusinessItemType } from './businesses.service';

const ITEM_TYPES: BusinessItemType[] = ['products', 'services', 'highlights'];

function itemType(type: string): BusinessItemType {
  if (!ITEM_TYPES.includes(type as BusinessItemType)) throw new BadRequestException('Tipo de contenido no válido');
  return type as BusinessItemType;
}

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private businesses: BusinessesService) {}

  @Get()
  @ApiOperation({ summary: 'Listado público de negocios (slugs) para el sitemap' })
  findAll() {
    return this.businesses.findAllPublic();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Micro-sitio público de un negocio' })
  findOne(@Param('slug') slug: string) {
    return this.businesses.findPublicBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':slug/reviews')
  @ApiOperation({ summary: 'Dejar o actualizar mi reseña de un negocio' })
  review(
    @Param('slug') slug: string,
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) body: BusinessReviewDto,
  ) {
    return this.businesses.review(userId, slug, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('me')
  @ApiOperation({ summary: 'Crear la página del negocio con la URL elegida' })
  createPage(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) body: CreateBusinessPageDto,
  ) {
    return this.businesses.createPage(userId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('me/image/:kind')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_IMAGE_BYTES },
      fileFilter: (_req, file, cb) =>
        ALLOWED_IMAGE_TYPES[file.mimetype]
          ? cb(null, true)
          : cb(new BadRequestException('Formato no permitido (usa jpeg, png o webp)'), false),
    }),
  )
  @ApiOperation({ summary: 'Subir logo o portada del negocio (kind = logo | cover)' })
  uploadImage(
    @Param('kind') kind: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string,
  ) {
    if (kind !== 'logo' && kind !== 'cover') throw new BadRequestException('kind debe ser logo o cover');
    if (!file) throw new BadRequestException('Falta el archivo (campo "file")');
    return this.businesses.uploadImage(userId, kind, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('me/:type')
  @ApiOperation({ summary: 'Agregar producto, servicio o destacado (type = products | services | highlights)' })
  addItem(
    @Param('type') type: string,
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) body: BusinessItemDto,
  ) {
    return this.businesses.addItem(userId, itemType(type), body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('me/:type/:id')
  @ApiOperation({ summary: 'Editar producto, servicio o destacado' })
  updateItem(
    @Param('type') type: string,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) body: BusinessItemDto,
  ) {
    return this.businesses.updateItem(userId, itemType(type), id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('me/:type/:id')
  @ApiOperation({ summary: 'Borrar producto, servicio o destacado' })
  deleteItem(@Param('type') type: string, @Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.businesses.deleteItem(userId, itemType(type), id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put('me')
  @ApiOperation({ summary: 'Actualizar el micro-sitio del usuario autenticado' })
  updateOwn(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) body: UpdateBusinessDto,
  ) {
    return this.businesses.updateOwn(userId, body);
  }
}
