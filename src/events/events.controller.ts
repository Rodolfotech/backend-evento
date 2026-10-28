import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, BadRequestException } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Listar eventos públicos con filtros (gratis, público, techado, franja horaria)' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'free', required: false, type: Boolean })
  @ApiQuery({ name: 'audience', required: false, enum: ['PAREJA', 'FAMILIA', 'GENERAL'] })
  @ApiQuery({ name: 'indoor', required: false, type: Boolean })
  @ApiQuery({ name: 'timeSlot', required: false, enum: ['tarde', 'noche'] })
  findAll(
    @Query('city') city?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('free') free?: string,
    @Query('audience') audience?: string,
    @Query('indoor') indoor?: string,
    @Query('timeSlot') timeSlot?: string,
  ) {
    return this.eventsService.findAll(city, page ? parseInt(page, 10) : undefined, limit ? parseInt(limit, 10) : undefined, {
      free: free === 'true' ? true : undefined,
      audience: audience || undefined,
      indoor: indoor === undefined ? undefined : indoor === 'true',
      timeSlot: timeSlot === 'tarde' || timeSlot === 'noche' ? timeSlot : undefined,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener eventos del usuario autenticado' })
  findByOwner(@CurrentUser('id') userId: string) {
    return this.eventsService.findByOwner(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my/stats')
  @ApiOperation({ summary: 'Métricas de mis eventos: vistas, cómo llegar y clics externos' })
  ownerStats(@CurrentUser('id') userId: string) {
    return this.eventsService.statsForOwner(userId);
  }

  @Post(':id/interactions')
  @ApiOperation({ summary: 'Registrar una interacción pública (VIEW, DIRECTIONS, EXTERNAL_LINK)' })
  interaction(@Param('id') id: string, @Body() body: { type: 'VIEW' | 'DIRECTIONS' | 'EXTERNAL_LINK' }) {
    if (!['VIEW', 'DIRECTIONS', 'EXTERNAL_LINK'].includes(body?.type)) {
      throw new BadRequestException('Tipo de interacción no válido');
    }
    return this.eventsService.registerInteraction(id, body.type);
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
