import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendeesService } from './attendees.service';
import { RegisterAttendeeDto } from '../common/dto';

@ApiTags('Attendees')
@Controller('attendees')
export class AttendeesController {
  constructor(private attendeesService: AttendeesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrarse a un evento' })
  register(@Body() body: RegisterAttendeeDto) {
    return this.attendeesService.register(body.userId, body.eventId);
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
}
