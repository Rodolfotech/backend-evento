import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendeesService } from './attendees.service';
import { RegisterAttendeeDto } from '../common/dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Attendees')
@Controller('attendees')
export class AttendeesController {
  constructor(private attendeesService: AttendeesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrarse a un evento' })
  register(@Body() body: RegisterAttendeeDto, @CurrentUser('id') userId: string) {
    return this.attendeesService.register(body.userId || userId, body.eventId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar registros del usuario autenticado' })
  findMy(@CurrentUser('id') userId: string) {
    return this.attendeesService.findByUser(userId);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Listar asistentes de un evento' })
  findByEvent(@Param('eventId') eventId: string) {
    return this.attendeesService.findByEvent(eventId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar eventos de un usuario' })
  findByUser(@Param('userId') userId: string) {
    return this.attendeesService.findByUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':eventId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancelar registro a un evento' })
  unregister(@Param('eventId') eventId: string, @CurrentUser('id') userId: string) {
    return this.attendeesService.unregister(userId, eventId);
  }
}
