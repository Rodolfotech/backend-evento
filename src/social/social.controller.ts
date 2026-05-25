import { Controller, Post, Delete, Get, Param, Body, UseGuards, HttpCode, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { SocialService } from './social.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ConnectSocialDto } from '../common/dto';

@ApiTags('Social')
@Controller('social')
export class SocialController {
  constructor(private socialService: SocialService) {}

  @Get('instagram/auth-url')
  @ApiOperation({ summary: 'Obtener URL de autorización de Instagram' })
  getInstagramAuthUrl() {
    return this.socialService.getInstagramAuthUrl();
  }

  @Post('instagram/callback')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Intercambiar código de Instagram por token' })
  instagramCallback(@CurrentUser('id') userId: string, @Body('code') code: string) {
    return this.socialService.instagramCallback(userId, code);
  }

  @Post('instagram/connect')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Conectar cuenta de Instagram con token directo' })
  connectInstagram(@CurrentUser('id') userId: string, @Body() body: ConnectSocialDto) {
    return this.socialService.connectInstagram(userId, body.accessToken);
  }

  @Post('facebook/connect')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Conectar cuenta de Facebook' })
  connectFacebook(@CurrentUser('id') userId: string, @Body() body: ConnectSocialDto) {
    return this.socialService.connectFacebook(userId, body.accessToken);
  }

  @Delete(':platform/disconnect')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Desconectar red social' })
  disconnect(@CurrentUser('id') userId: string, @Param('platform') platform: string) {
    return this.socialService.disconnect(userId, platform);
  }

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener estado de conexión social' })
  getStatus(@CurrentUser('id') userId: string) {
    return this.socialService.getStatus(userId);
  }

  @Post('instagram/refresh')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Refrescar token de Instagram' })
  refreshToken(@CurrentUser('id') userId: string) {
    return this.socialService.refreshToken(userId);
  }

  @Get('instagram/media')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener publicaciones de Instagram del usuario autenticado' })
  getUserMedia(@CurrentUser('id') userId: string) {
    return this.socialService.getUserMedia(userId);
  }

  @Post('sync/:eventId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sincronizar publicaciones de Instagram a un evento' })
  syncFeed(@CurrentUser('id') userId: string, @Param('eventId') eventId: string) {
    return this.socialService.syncFeed(userId, eventId);
  }

  @Get('instagram/webhook')
  @ApiExcludeEndpoint()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') verifyToken: string,
  ) {
    return this.socialService.verifyWebhook(mode, challenge, verifyToken);
  }

  @Post('instagram/webhook')
  @ApiExcludeEndpoint()
  @HttpCode(200)
  handleWebhook(@Req() req: any) {
    return this.socialService.handleWebhook(req.body);
  }
}
