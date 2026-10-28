import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { LinkEventMediaDto } from '../common/dto';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, MediaService } from './media.service';

@ApiTags('Media')
@Controller()
export class MediaController {
  constructor(private media: MediaService) {}

  @Get('events/:eventId/media')
  @ApiOperation({ summary: 'Listar medios de un evento' })
  list(@Param('eventId') eventId: string) {
    return this.media.list(eventId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('events/:eventId/media/upload')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir imagen (jpeg, png o webp, máx. 5 MB) a un evento propio' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_IMAGE_BYTES },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_IMAGE_TYPES[file.mimetype]) {
          return cb(new BadRequestException('Formato no permitido (usa jpeg, png o webp)'), false);
        }
        cb(null, true);
      },
    }),
  )
  upload(
    @Param('eventId') eventId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    if (!file) throw new BadRequestException('Falta el archivo (campo "file")');
    return this.media.uploadImage(eventId, userId, role, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('uploads/image')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir imagen temporal para una publicación (devuelve la URL)' })
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
  uploadTemp(@UploadedFile() file: Express.Multer.File, @CurrentUser('id') userId: string) {
    if (!file) throw new BadRequestException('Falta el archivo (campo "file")');
    return this.media.uploadTemp(userId, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('events/:eventId/media/link')
  @ApiOperation({ summary: 'Agregar un enlace de publicación a un evento propio' })
  link(
    @Param('eventId') eventId: string,
    @Body(new ValidationPipe({ whitelist: true, transform: true })) body: LinkEventMediaDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.media.addLink(eventId, userId, role, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete('media/:id')
  @ApiOperation({ summary: 'Borrar un medio (y su archivo en Storage) de un evento propio' })
  remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.media.remove(id, userId, role);
  }
}
