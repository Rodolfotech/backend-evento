import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from '../common/dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los eventos' })
  findAll() {
    return this.eventsService.findAll();
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
  create(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
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
