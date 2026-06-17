import { Controller, Get, Put, Delete, Param, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.findById(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar perfil del usuario autenticado' })
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() body: {
      name?: string;
      avatar?: string;
      companyInstagram?: string;
      website?: string;
      companyRut?: string;
      companyGiro?: string;
      companyPhone?: string;
      companyAddress?: string;
      city?: string;
      comuna?: string;
      adminFirstName?: string;
      adminLastName?: string;
      adminRut?: string;
      adminPhone?: string;
    },
  ) {
    return this.usersService.update(userId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar cuenta del usuario autenticado y todos sus datos' })
  deleteAccount(@CurrentUser('id') userId: string) {
    return this.usersService.deleteAccount(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
