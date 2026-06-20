import { Controller, Post, Get, Body, Query, HttpCode, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../common/dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(body.email, body.password);
    res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
    return result;
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() body: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.register(body);
    res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
    return result;
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Solicitar recuperación de contraseña' })
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Restablecer contraseña con token' })
  async resetPasswordWithToken(
    @Body('token') token: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.resetPasswordWithToken(token, password);
    res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
    return result;
  }

  @Post('check-email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verificar si un email existe' })
  checkEmail(@Body('email') email: string) {
    return this.authService.checkEmail(email);
  }

  @Post('reset-password-direct')
  @HttpCode(200)
  @ApiOperation({ summary: 'Restablecer contraseña directamente (solo desarrollo)' })
  async resetPasswordDirect(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.resetPassword(body.email, body.password);
    res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
    return result;
  }

  @Get('instagram/url')
  @ApiOperation({ summary: 'Obtener URL de autorización de Instagram para login' })
  getInstagramAuthUrl(@Query('state') state?: string) {
    return this.authService.getInstagramAuthUrl(state);
  }

  @Post('instagram')
  @HttpCode(200)
  @ApiOperation({ summary: 'Iniciar sesión o registrarse con Instagram' })
  async instagramLogin(@Body('code') code: string, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.instagramLogin(code);
    res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
    return result;
  }

  @Get('google/url')
  @ApiOperation({ summary: 'Obtener URL de autorización de Google' })
  getGoogleAuthUrl(@Query('state') state?: string) {
    return this.authService.getGoogleAuthUrl(state);
  }

  @Post('google')
  @HttpCode(200)
  @ApiOperation({ summary: 'Iniciar sesión o registrarse con Google' })
  async googleLogin(@Body('code') code: string, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.googleLogin(code);
    res.cookie('access_token', result.access_token, COOKIE_OPTIONS);
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario autenticado desde cookie' })
  me(@CurrentUser() user: any) {
    return { user };
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Cerrar sesión (limpiar cookie)' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { path: '/' });
    return { message: 'Sesión cerrada' };
  }
}
