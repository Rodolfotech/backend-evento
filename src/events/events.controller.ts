import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from '../common/dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los eventos' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(
    @Query('city') city?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.eventsService.findAll(city, page ? parseInt(page, 10) : undefined, limit ? parseInt(limit, 10) : undefined);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener eventos del usuario autenticado' })
  findByOwner(@CurrentUser('id') userId: string) {
    return this.eventsService.findByOwner(userId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtener evento por slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un evento' })
  create(@Body() body: CreateEventDto, @CurrentUser('id') userId: string) {
    return this.eventsService.create({ ...body, ownerId: userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un evento' })
  update(@Param('id') id: string, @Body() body: UpdateEventDto) {
    return this.eventsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un evento' })
  delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
