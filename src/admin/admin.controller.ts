import { Controller, Get, Post, Param, Query, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Admin')
@Controller()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('users')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los usuarios (admin)' })
  findAllUsers(
    @CurrentUser('id') adminId: string,
    @Query('comuna') comuna?: string,
    @Req() req?: Request,
  ) {
    return this.adminService.findAllUsers(adminId, comuna, req?.ip);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('users/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener detalle de usuario (admin)' })
  findUserById(
    @CurrentUser('id') adminId: string,
    @Param('id') id: string,
    @Req() req?: Request,
  ) {
    return this.adminService.findUserById(adminId, id, req?.ip);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('comunas')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener comunas con usuarios registrados' })
  getComunas(
    @CurrentUser('id') adminId: string,
    @Req() req?: Request,
  ) {
    return this.adminService.getComunas(adminId, req?.ip);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get('stats')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Estadísticas generales' })
  getStats(
    @CurrentUser('id') adminId: string,
    @Req() req?: Request,
  ) {
    return this.adminService.getStats(adminId, req?.ip);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('instagram-click')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar click a Instagram' })
  trackInstagramClick(
    @CurrentUser('id') userId: string,
    @Body('eventId') eventId?: string,
  ) {
    return this.adminService.trackInstagramClick(userId, eventId);
  }
}